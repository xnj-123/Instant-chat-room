<template>
  <div class="operate_container">
    <div class="toolbar">
      <el-button class="emoji" :icon="HelpFilled" @click="showEmoji = true"></el-button>
      <el-button class="document" :icon="FolderAdd"></el-button>
      <el-button class="scissor" :icon="Scissor"></el-button>
      <div class="emoji_area" :style="{ display: showEmoji ? 'block' : 'none' }">
        <EmojiPicker :native="true" @select="onVue3EmojiPicker" />
      </div>
    </div>
    <div class="textEdit" contenteditable="true" ref="textEditRef" @input="updateContent"></div>
    <div class="submit">
      <el-button class="submit" @click="sendMessage" :disabled="content == ''">发送</el-button>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { FolderAdd, HelpFilled, Scissor } from '@element-plus/icons-vue';
import { ref } from 'vue'
let showEmoji = ref<boolean>(false)
let content = ref<string>('')
let textEditRef = ref()
const $emit = defineEmits(['sendM'])

import EmojiPicker from "vue3-emoji-picker";
import "vue3-emoji-picker/css";

const text_1 = ref("");

const onVue3EmojiPicker = (emoji: any) => {
  showEmoji.value = false;
  content.value += emoji.i;
  textEditRef.value.innerHTML = content.value
};

const updateContent = (event: Event) => {
  const target = event.target as HTMLDivElement;
  content.value = target.innerHTML;
};

const sendMessage = () => {
  $emit('sendM', {
    message: content.value
  })
  if (textEditRef.value) {
    textEditRef.value.innerHTML = '';
  }
  content.value = '';
}

</script>


<style scoped lang='scss'>
.operate_container {
  width: 100%;
  height: 100%;
  background-color: rgb(220, 216, 216);
  position: relative;

  .toolbar {
    height: 50px;
    border-top: 4px solid rgb(72, 72, 72);
    border-bottom: 4px solid rgb(72, 72, 72);
    display: flex;
    align-items: center;


    .emoji {
      margin-left: 20px;
    }

    .emoji_area {
      position: absolute;
      top: -320px;
    }
  }

  .textEdit {
    height: 14vh;
    overflow-y: auto;
    background-color: white;
    padding: 10px;
  }

  .submit {
    position: absolute;
    right: 50px;
    margin-top: 4px;
  }
}
</style>