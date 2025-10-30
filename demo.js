// let x;
// let y = null;
// // console.log(x);
// // console.log(y);
// // console.log(null === undefined);

// let arr = [, , ,];
// // arr.length=10;
// console.log(arr.length);
// const title = "cristiano Ronaldo sadasd asdasdasd as sd";
// console.log(title.length);
// const newTitle = title[0].toUpperCase() + title.substring(1, title.length);
// console.log(newTitle);

 const mongoData = async () => {
    const res = await fetch("http://localhost:3000/product");
    const data = await res.json();
    return await data;
  };
  const dataOfMongoDb = await mongoData();
  console.log(dataOfMongoDb);