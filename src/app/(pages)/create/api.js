



import AXIOS_API from "@/utils/axiosAPI"

export async function postImages(cloudName, formDate){
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formDate
    })

    const data = await res.json()

    const imageUlr = data["secure_url"]
   
    return imageUlr

}

export async function createNewListing(data, imageUrls) {
    const { data: newListing } = await AXIOS_API.post('/listing', { ...data, imageUrls })

    console.log(newListing)
    return newListing
}

