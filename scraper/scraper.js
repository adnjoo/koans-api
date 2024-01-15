const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const url = "https://ashidakim.com/zenkoans";

async function scrape() {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const koans = [];

    const koanPromises = $(".zenkoanlist li")
      .map(async (index, element) => {
        const title = $(element).text().trim();
        const link = $(element).find("a").attr("href");

        // Fetch the individual koan page
        const koanResponse = await axios.get(link);
        const koanPage = cheerio.load(koanResponse.data);

        // Extract the description from the individual koan page
        // const description = koanPage(".main p").text().replace(/"/g, "'");
        const paragraphs = koanPage(".main p").map((index, element) => $(element).text().trim());
        const description = paragraphs.get().join('<br/><br/>');


        koans.push({ title, link, description });

        // If you want to log each koan separately
        console.log(
          `Title: ${title}\nLink: ${link}\nDescription: ${description}\n`
        );
      })
      .get();

    await Promise.all(koanPromises);

    // Sort the JSON array by the number in the title
    koans.sort((a, b) => {
      const numA = parseInt(a.title.match(/\d+/)[0], 10);
      const numB = parseInt(b.title.match(/\d+/)[0], 10);
      return numA - numB;
    });

    // Save data to JSON file
    fs.writeFileSync("zen_koans.json", JSON.stringify(koans, null, 2));

    console.log("Data saved to zen_koans.json");
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}

scrape();
