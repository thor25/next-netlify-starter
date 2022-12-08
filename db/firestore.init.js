import { firestore,auth} from "./firebase.js";

export async function  signIn (emailAddress, password)   {
console.log("🚀 ~ file: firestore.init.js ~ line 41 ~ password", password)
console.log("🚀 ~ file: firestore.init.js ~ line 41 ~ emailAddress", emailAddress)
var grupos="";
if (!emailAddress || !password) {
  reject(new Error("No e-mail address or password"));
  return;
}
var value = await   auth.signInWithEmailAndPassword(emailAddress, password)
const user = value.user;

if (!user) {
  reject(new Error("No user"));

  return;
}

const uid = user.uid;

if (!uid) {
  reject(new Error("No UID"));

  return;
}

const userDocumentReference = firestore.collection("users").doc(uid);
const doc = await userDocumentReference.get();
if (!doc.exists) 
  console.log('No such document!');
else 
   grupos =  doc.data().datos
console.log("🚀 ~ file: firestore.init.js ~ line 34 ~ signIn ~ grupos", grupos)

const fitbitRef = firestore.collection('fitbit').doc('datos')

const docf = await fitbitRef.get();
var cadena  = ""
if (!docf.exists) {
  console.log('No such document!');
} else {
  cadena =  docf.data().grupos;
}
var cadenas = cadena.toUpperCase().split(',')
console.log("🚀 ~ file: firestore.init.js ~ line 46 ~ signIn ~ cadenas", cadenas)
console.log("🚀 ~ file: firestore.init.js ~ line 46 ~ signIn ~ cadena", cadena)

var paradas = []
cadenas.forEach((grupo)=> 
{
  var valor  =grupos.find(gr => grupo === gr.nombre.toUpperCase()) 
  console.log("🚀 ~ file: firestore.init.js ~ line 53 ~ signIn ~ valor", valor)
  if (valor!==undefined)
    paradas.push(valor)
})
return paradas

}
/*    
  // return new Promise(async (resolve, reject) => {
  //   if (!emailAddress || !password) {
  //     reject(new Error("No e-mail address or password"));
  //     return;
  //   }
  //   // console.log(auth.currentuser)

  //   // if (auth.currentUser) {
  //   //   reject(new Error("No current user"));

  //   //   return;
  //   // }

  //  auth
  //     .signInWithEmailAndPassword(emailAddress, password)
  //     .then(async (value) => {
  //       const user = value.user;

  //       if (!user) {
  //         reject(new Error("No user"));

  //         return;
  //       }

  //       const uid = user.uid;

  //       if (!uid) {
  //         reject(new Error("No UID"));

  //         return;
  //       }

  //       const userDocumentReference = firestore.collection("users").doc(uid);
  //       const doc = await userDocumentReference.get();
  //       if (!doc.exists) {
  //         console.log('No such document!');
  //       } else {
  //         grupos =  doc.data().datos
  //        return grupos
  //       }
        
        
  //     })
  //     .catch((reason) => {
  //     console.log("🚀 ~ file: firestore.init.js ~ line 53 ~ returnnewPromise ~ reason", reason)
        
  //       reject(reason);
  //     });
  // }).then((data)=>{
  //   console.log("🚀 ~ file: firestore.init.js ~ line 58 ~ }).then ~ data", data)

  //   return data});
     
  //   }
*/