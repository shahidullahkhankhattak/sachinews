<template>
  <social-sharing
    :url="details.url"
    :title="details.title"
    :description="details.description"
    :quote="details.quote"
    :hashtags="details.hashtags"
    :twitter-user="user"
    inline-template
  >
    <div class="share-items">
      <network network="facebook" class="bg-blue-9 q-pa-sm q-px-md cursor-pointer text-white">
        <i class="fab fa-facebook q-mr-sm"></i> {{ $t('Facebook') }}
      </network>
      <network network="twitter" class="bg-blue-4 q-pa-sm q-px-md cursor-pointer text-white">
        <i class="fab fa-twitter q-mr-sm"></i> {{ $t('Twitter' )}}
      </network>
      <network network="whatsapp" class="bg-green-14 q-pa-sm q-px-md cursor-pointer text-white">
        <i class="fab fa-whatsapp q-mr-sm"></i> {{ $t('Whatsapp') }}
      </network>
      <network network="linkedin" class="bg-cyan-6 q-pa-sm q-px-md cursor-pointer text-white">
        <i class="fab fa-linkedin q-mr-sm"></i> {{ $t('LinkedIn') }}
      </network>
      <network network="pinterest" class="bg-red-7 q-pa-sm q-px-md cursor-pointer text-white">
        <i class="fab fa-pinterest q-mr-sm"></i>{{ $t('Pinterest') }}
      </network>
      <!-- <network network="odnoklassniki">
        <i class="fa fa-odnoklassniki"></i> Odnoklassniki
      </network>
      <network network="reddit"> <i class="fa fa-reddit"></i> Reddit </network>
      <network network="skype"> <i class="fa fa-skype"></i> Skype </network>
      <network network="sms"> <i class="fa fa-commenting-o"></i> SMS </network>
      <network network="telegram">
        <i class="fa fa-telegram"></i> Telegram
      </network>
      <network network="vk"> <i class="fa fa-vk"></i> VKontakte </network>
      <network network="weibo"> <i class="fa fa-weibo"></i> Weibo </network>
      <network network="email">
        <i class="fa fa-envelope"></i> Email
      </network>
      <network network="googleplus">
        <i class="fa fa-google-plus"></i> Google +
      </network> -->
    </div>
  </social-sharing>
</template>
<script>
import { config } from '../../config';

const {
  app: {
    logo: { title },
  },
} = config;
export default {
  props: ['details', 'type'],
  data() {
    return {
      user: title,
    };
  },
};
</script>
