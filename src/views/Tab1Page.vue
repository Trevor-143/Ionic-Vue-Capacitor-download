<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tab 1</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 1</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-button @click="writeSecretFile">Downloading</ion-button>
      <ion-button @click="saveImageToDevice">Get image</ion-button>
      <ExploreContainer name="Tab 1 page" />
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';

import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

const writeSecretFile = async () => {
  await Filesystem.writeFile({
    path: 'testFiles/sample.json',
    data: `{
      "id": "8393f4b0840f3",
      "title": "Hello World!",
      "description": "This is a sample file for testing purposes."
    }`,
    directory: Directory.Documents,
    encoding: Encoding.UTF8,
    recursive: true
  });
};

const saveImageToDevice = async () => {
  // image is in the public folder
  const imageUrl = '/testFiles/image.jpg';

  try {
    // Fetch the image file as a Blob
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    // Convert Blob to Base64
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = async () => {
      const base64Data = reader.result.split(',')[1];

      // Save the image file to the device
      await Filesystem.writeFile({
        path: 'testFiles/image.jpg',
        data: base64Data,
        directory: Directory.Documents,
        encoding: Encoding.Base64,
        recursive: true,
      });

      console.log('Image saved successfully');
    };
  } catch (error) {
    console.error('Failed to save image', error);
  }
};

const readSecretFile = async () => {
  const contents = await Filesystem.readFile({
    path: 'testFiles/sample.txt',
    directory: Directory.Documents,
    encoding: Encoding.UTF8,
  });

  console.log('secrets:', contents);
};

const deleteSecretFile = async () => {
  await Filesystem.deleteFile({
    path: 'testFiles/sample.txt',
    directory: Directory.Documents,
  });
};

const readFilePath = async () => {
  // Here's an example of reading a file with a full file path. Use this to
  // read binary data (base64 encoded) from plugins that return File URIs, such as
  // the Camera.
  const contents = await Filesystem.readFile({
    path: 'file:///var/mobile/Containers/Data/Application/22A433FD-D82D-4989-8BE6-9FC49DEA20BB/Documents/text.txt',
  });

  console.log('data:', contents);
};


</script>
