import { getFirestore, collection, getDocs, query, where, WhereFilterOp, getDoc, doc, QueryFieldFilterConstraint, orderBy, limitToLast } from "firebase/firestore";
import { db } from '@/lib/firebase/firebase'; // Adjust the path as necessary
import { Dispatch, SetStateAction } from "react";


export async function fetchDoc(collectionName: string, document: string) {
  const collectionRef = collection(db, collectionName)
  const docRef = doc(collectionRef, document)
  const snapShot: any = await getDoc(docRef)
  // console.log(snapShot)
  return {docID: snapShot.id, ...snapShot.data()}
}
export async function fetchData(collectionName: string, fieldPath: string, relationalOperator: WhereFilterOp, value: string, stateArray: any[]|undefined, setStateArray: Dispatch<SetStateAction<any[]|undefined>>) {
    // console.log('use', collectionName, fieldPath, relationalOperator, value)
    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef, where(fieldPath, relationalOperator, value))
    const querySnapshot = await getDocs(q)
  
    let data:any = [];
    querySnapshot.forEach((doc) => {
      // console.log(doc)
      data.push({ docID: doc.id, ...doc.data() });
    });
    setStateArray(data)
    // console.log(data)
    return stateArray; // Data will be available as props in your component
  }

  export async function fetchAndReturn(collectionName: string, fieldPath: string, relationalOperator: WhereFilterOp, value: any) {
    // console.log('use', collectionName, fieldPath, relationalOperator, value)
      const collectionRef = collection(db, collectionName);
      let q = query(collectionRef, where(fieldPath, relationalOperator, value))    
  
      const querySnapshot = await getDocs(q)
    
      var data:any = [];
      for (let i=0; i<querySnapshot.docs.length; i++){
        var doc = querySnapshot.docs[i];
        data.push({ docID: doc.id, ...doc.data() });
      }
      
      // console.log(data)
      return data;
  }

export async function fetchAndReturnOrderedLimit(collectionName: string, fieldPath: string, relationalOperator: WhereFilterOp, value: any, order_by: string, limit: number=5, sortorder: 'asc'|'desc'='desc') {
  // console.log('use', collectionName, fieldPath, relationalOperator, value)
    const collectionRef = collection(db, collectionName);
    let q = query(collectionRef, where(fieldPath, relationalOperator, value), orderBy(order_by, sortorder), limitToLast(limit))    
    const querySnapshot = await getDocs(q)
  
    var data:any = [];
    for (let i=0; i<querySnapshot.docs.length; i++){
      var doc = querySnapshot.docs[i];
      data.push({ docID: doc.id, ...doc.data() });
    }
    
    // console.log(data)
    return data;
}
  
export async function fetchAndReturnWithMultipleConditions(collectionName: string, conditions: {fieldPath: string, relationalOperator: WhereFilterOp, value: any}[]) {
  
  let queries: QueryFieldFilterConstraint[] = []
  conditions.forEach((value)=>{
    queries.push(where(value.fieldPath, value.relationalOperator, value.value))
  })
  const docRef = collection(db, collectionName);
  const q = query(docRef, ...queries)
  const querySnapshot = await getDocs(q)

  var data:any = [];
  for (let i=0; i<querySnapshot.docs.length; i++){
    var doc = querySnapshot.docs[i];
    data.push({ docID: doc.id, ...doc.data() });
  }
  
  // console.log(data)
  return data;
}