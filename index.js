const { uniqueNamesGenerator, adjectives, colors, animals } = require("unique-names-generator");

const { AnimeWallpaper, AnimeSource } = require("anime-wallpaper");
const wallpaper = new AnimeWallpaper();

const randomName = uniqueNamesGenerator({
 dictionaries: [colors, colors],
}); // big_red_donkey

const shortName = uniqueNamesGenerator({
 dictionaries: [colors], // colors can be omitted here as not used
 length: 1,
}); // b

console.log(randomName);
console.log(shortName);

// Tambahkan async di depan fungsi
async function cariWaifu() {
 // Gunakan await di dalam fungsi async
 const waifu = await wallpaper.search({ title: "Hatsune Miku" }, AnimeSource.ZeroChan);

 console.log(waifu);
}

// Panggil fungsi async
cariWaifu();
