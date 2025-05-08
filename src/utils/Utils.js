import { ExamplesFileUrl } from "../constants/Consts";

export const fetchExamples = async () => {
  console.log('calling');
  try {
    console.log(ExamplesFileUrl); // should be something like: 'examples.json'

    const response = await fetch(`http://localhost:3000/${ExamplesFileUrl}`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Failed to fetch examples:", error);
    return [];
  }
};

// export const fetchExamples = async () => {
//   console.log('calling')
//   try {
//     console.log(ExamplesFileUrl)
//     // console.log(`http://localhost:3000/${ExamplesFileUrl}`)
//     // const response = await fetch(`http://localhost:3000/${ExamplesFileUrl}`)
//     const response = await fetch('http://localhost:3000/models/dxf/SATTVA_Kaggalipura.dxf');

//     // const response = await fetch(`${import.meta.env.BASE_URL}${ExamplesFileUrl}`);
//     console.log(response)
//     console.log(response.json())
//     return await response.json();
//   } catch (error) {
//     console.error("Failed to fetch examples:", error);
//     return [];
//   }
// };