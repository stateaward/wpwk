<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-icon 
          v-bind="attrs"
          v-on="on"
        >mdi-help-circle-outline</v-icon>  
      </template>

      <v-card>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="secondary"
            text
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-actions>
        <v-divider></v-divider>
        <v-card-text>
          <!-- 가이드라인 안의 슬라이드 -->
          <v-carousel
            cycle
            height="auto"
            hide-delimiter-background
            show-arrows-on-hover
          >
            <v-carousel-item
              v-for="(item, i) in items"
              :key="i"
              :src="item.src"
              reverse-transition="fade-transition"
              transition="fade-transition"
            >
            </v-carousel-item>
          </v-carousel>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  name: 'Guideline',
  data: function () {
    return {
      dialog: false,
      //임시 슬라이드 위한 데이터(나중에 지울것)
      items: [
        {
          src: 'https://firebasestorage.googleapis.com/v0/b/wipawiki-bfa21.appspot.com/o/guide1.JPG?alt=media&token=3b611efd-458b-4e22-975f-0e973ee1309d',
        },
        {
          src: 'https://firebasestorage.googleapis.com/v0/b/wipawiki-bfa21.appspot.com/o/guide2.JPG?alt=media&token=f5262f60-0cb6-44d4-ae09-2a65e00cc1f8',
        },
        {
          src: 'https://firebasestorage.googleapis.com/v0/b/wipawiki-bfa21.appspot.com/o/guide3.JPG?alt=media&token=7d5ada35-5901-4d07-a378-ee513a7e96f3',
        },
        {
          src: 'https://firebasestorage.googleapis.com/v0/b/wipawiki-bfa21.appspot.com/o/guide4.JPG?alt=media&token=608536a0-82b8-45de-8d48-cda8ac059088',
        },
        {
          src: 'https://firebasestorage.googleapis.com/v0/b/wipawiki-bfa21.appspot.com/o/guide5.JPG?alt=media&token=b82c1975-327f-4001-badc-205db89eb31e',
        },
        {
          src:'https://firebasestorage.googleapis.com/v0/b/wipawiki-bfa21.appspot.com/o/guilde6.JPG?alt=media&token=bae275be-d245-4293-b546-9f79a42cf362',
        },
      ]
    }
  }
}
</script>
<style>
</style>