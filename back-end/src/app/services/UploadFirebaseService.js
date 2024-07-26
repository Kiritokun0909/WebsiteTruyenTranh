const { bucket } = require("../../configs/FirebaseConfig.js");

/**
 * Uploads an image to a specified folder in Firebase Storage.
 * @param {Buffer} fileBuffer - The buffer of the image file.
 * @param {string} folderName - The name of the folder where the image should be uploaded.
 * @param {string} filename - The desired name of the file in the storage.
 * @param {string} mimeType - The MIME type of the file.
 * @returns {Promise<string>} - The public URL of the uploaded image.
 */
const uploadImage = async (fileBuffer, folderName, filename, mimeType) => {
    return new Promise((resolve, reject) => {
        const file = bucket.file(`${folderName}/${filename}`);
        const blobStream = file.createWriteStream({
            metadata: {
                contentType: mimeType,
            },
        });

        blobStream.on("error", (err) => {
            console.error(err);
            reject("Error uploading image");
        });

        blobStream.on("finish", async () => {
            try {
                await file.makePublic(); // Make the file publicly accessible
                const publicUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;
                resolve(publicUrl);
            } catch (error) {
                reject("Error making file public");
            }
        });

        blobStream.end(fileBuffer);
    });
};

module.exports = { uploadImage };
