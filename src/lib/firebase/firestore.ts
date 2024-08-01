import { db } from "./firebase";
import { writeBatch, doc, WriteBatch, getDoc } from "firebase/firestore";

const createWriteBatch = () => {
    const batch = writeBatch(db);
    return batch;
};

function writeToBatch(batch: WriteBatch, collection: string, document: string, o: object) {
    const docRef = doc(db, collection, document);
    // Remove undefined values
    const cleanedObject = Object.fromEntries(
        Object.entries(o).filter(([_, v]) => v !== undefined)
    );
    batch.set(docRef, cleanedObject);
}

function updateBatch(batch: WriteBatch, collection: string, document: string, o: object) {
    const docRef = doc(db, collection, document);
    // Remove undefined values
    const cleanedObject = Object.fromEntries(
        Object.entries(o).filter(([_, v]) => v !== undefined)
    );
    batch.update(docRef, cleanedObject);
}

function deleteDocFromBatch(batch: WriteBatch, collection: string, document: string) {
    const docRef = doc(db, collection, document);
    batch.delete(docRef);
}

function writeToDoc(collection: string, document: string, o: object) {
    const batch = writeBatch(db);
    const ref = doc(db, collection, document);
    // Remove undefined values
    const cleanedObject = Object.fromEntries(
        Object.entries(o).filter(([_, v]) => v !== undefined)
    );
    batch.set(ref, cleanedObject);
    return batch.commit();
}

const commitBatch = async (batch: WriteBatch) => {
    try {
        await batch.commit();
        return true;
    } catch (err) {
        return false;
    }
};

const existsDoc = async (collection: string, document: string) => {
    const docRef = doc(db, collection, document);
    const v = await getDoc(docRef);
    return v.exists();
};

export {
    createWriteBatch,
    commitBatch,
    writeToBatch,
    writeToDoc,
    existsDoc,
    deleteDocFromBatch,
    updateBatch
};