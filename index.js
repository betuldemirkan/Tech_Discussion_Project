const duzlemX = 8;
const duzlemY=8;
const OyuncununBulunduguDuzlemX= Math.floor(Math.random()*duzlemX);
const OyuncununBulunduguDuzlemY= Math.floor(Math.random()*duzlemY);

const DusmanlarınBaslangicX = [];
const DusmanlarınBaslangicY = [];

for(let i = 0 ; i<4; i++){
    DusmanlarınBaslangicX[i] =Math.floor(Math.random()*duzlemX);
    DusmanlarınBaslangicY[i] =Math.floor(Math.random()*duzlemY);
}

const HedefDusmanX =Math.floor(Math.random()*duzlemX);
const HedefDusmanY =Math.floor(Math.random()*duzlemY);
const OyuncununAdimSayisi= 
HedefeUlas(OyuncununBulunduguDuzlemX,OyuncununBulunduguDuzlemY,HedefDusmanX,HedefDusmanY);

console.log(`Oyuncunun başlangıç konumu: (${OyuncununBulunduguDuzlemX}, ${OyuncununBulunduguDuzlemY})`);
for (let i= 0; i < 4; i++) {
    console.log(`${i + 1}. düşmanın başlangıç konumu: (${DusmanlarınBaslangicX[i]}, ${DusmanlarınBaslangicY[i]})`);
}

console.log(`Oyuncunun adım sayısı: ${OyuncununAdimSayisi}`);


function HedefeUlas(OyuncununBulunduguDuzlemX,OyuncununBulunduguDuzlemY,HedefDusmanX,HedefDusmanY){
    return Math.floor(Math.sqrt(Math.pow(HedefDusmanX- OyuncununBulunduguDuzlemX,2)+Math.pow(HedefDusmanY-OyuncununBulunduguDuzlemY,2))
)}

    
