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
        let koan = {};
        const title = $(element).text().trim();
        const link = $(element).find("a").attr("href");

        const id = title.match(/\d+/)[0];

        // Fetch the individual koan page
        const koanResponse = await axios.get(link);
        const koanPage = cheerio.load(koanResponse.data);

        // Extract the description from the individual koan page
        // const description = koanPage(".main p").text().replace(/"/g, "'");
        const paragraphs = koanPage(".main p").map((index, element) => $(element).text().trim());
        const description = paragraphs.get().join('<br/><br/>');

        koan = { title, link, description, id };

        // if ../next/public/audio contains id.mp3, add audio: id.mp3
        const audioPath = `../next/public/audio/${id}.mp3`;
        const hasAudio = fs.existsSync(audioPath);

        if (hasAudio) {
          koan.audio = `${id}.mp3`;
        }

        // if ../next/public/pics contains id.jpeg or id.jpg, add image: id.jpeg or id.jpg
        const imagePath = `../next/public/pics/${id}.jpg`;
        const hasImage = fs.existsSync(imagePath);

        if (hasImage) {
          koan.image = `${id}.jpg`;
        }

        koans.push(koan);

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
