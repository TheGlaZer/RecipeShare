import storage from '@react-native-firebase/storage';

const uploadImage = async (uri) => {
    if (!uri) return null;

    const fileName = uri.substring(uri.lastIndexOf('/') + 1);
    const reference = storage().ref(fileName);
    const task = reference.putFile(uri);

    try {
        await task;
        const url = await reference.getDownloadURL();
        return url;
    } catch (e) {
        console.error(e);
        return null;
    }
};
