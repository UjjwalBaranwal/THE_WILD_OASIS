import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.log(error);
    throw new Error("Cabin could not be loaded");
  }
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.log(error);
    throw new Error("cabin could not be deleted");
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin?.image?.name}`?.replace(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  // https://aejtjzfrmrkixowcefxg.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  //1. create/edit Cabin
  let query = supabase.from("cabins");
  // A)  Create
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);
  // B) Edit
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  const { data, error } = await query.select().single();
  if (error) {
    console.log(error);
    throw new Error("cabin could not be created");
  }

  // upload image
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. delete cabin if there is error in uploading the cabin
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log(storageError);
    throw new Error("Cabin image is not uploaded and this cabin is deleteds");
  }
  return data;
}
