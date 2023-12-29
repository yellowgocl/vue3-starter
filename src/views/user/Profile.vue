<script setup>
import { isObject, isString } from 'lodash'
import { RouterLink } from 'vue-router'
import { NIcon } from 'naive-ui'
import { AnalyticsFilled, DirectionsCarFilled, GamepadFilled, HomeWorkFilled, PersonPinSharp, ShareFilled, SportsScoreFilled } from '@vicons/material'
import { useUserStore } from '@/store'

const userStore = useUserStore()
const { avatar, name, email, role } = userStore
const roleColorMap = {
  admin: 'warning',
  referee: 'success',
  player: 'info',
}

function renderLabel(label, route) {
  const to = isString(route) ? { path: route } : { ...(isObject(route) || {}) }
  return () => h(
    RouterLink,
    { to },
    { default: () => label },
  )
}
function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) })
}
const menuOptions = [
  {
    type: 'group',
    label: '赛事相关',
    key: 'matchs',
    children: [
      {
        label: renderLabel('已报名赛事', '/event'),
        key: 'matchs--my-games',
        icon: renderIcon(GamepadFilled),
      },
      {
        label: renderLabel('排行榜', '/ranking'),
        key: 'matchs--ranking',
        icon: renderIcon(SportsScoreFilled),
      },
      {
        label: renderLabel('往绩统计', '/user/score'),
        key: 'matchs--my-car',
        icon: renderIcon(AnalyticsFilled),
      },
      {
        label: renderLabel('我的爱车', '/user/car'),
        key: 'matchs--my-car',
        icon: renderIcon(DirectionsCarFilled),
      },
    ],
  },
  {
    type: 'group',
    label: '杂项相关',
    key: 'utils',
    children: [
      {
        label: renderLabel('邀请参赛', '/event'),
        key: 'utils--share-match',
        icon: renderIcon(ShareFilled),
      },
      {
        label: renderLabel('寻找组织', '/lab'),
        key: 'utils--lab',
        icon: renderIcon(HomeWorkFilled),
      },
      {
        label: renderLabel('我的老友', '/user/friends'),
        key: 'utils--friends',
        icon: renderIcon(PersonPinSharp),
      },
    ],
  },
]
</script>

<template>
  <common-page :show-header="false">
    <n-card
      class="bg-neutral-800 dark:bg-neutral-700"
      content-class="!pa-4 !sm:pa-4 !md:pa-6"
      footer-style="padding: 0"
      rounded-3
    >
      <template #footer>
        <n-divider class="!mb-[16px] !mt-0 !sm:mb-[22px] !sm:mt-[22px]" />
        <div class="text-sm !pa-3 !pt-0 md:text-base !md:pa-6 !sm:pa-4 !md:pt-0 !sm:pt-0">
          <n-tooltip v-for="item in role" :key="`role-${item}`" placement="bottom" trigger="hover">
            <template #trigger>
              <n-button class="mr-1 md:mr-3" :type="roleColorMap[item]" size="tiny" round ghost>
                {{ $t(`role.${item}`) }}
              </n-button>
            </template>
            <span> {{ $t(`role.description.${item}`) }} </span>
          </n-tooltip>
        </div>
      </template>
      <div class="flex flex-row flex-wrap prose prose-gray prose-invert xs:flex-nowrap">
        <div class="mb-3 mr-0 w-full flex-auto xs:mb-0 xs:mr-6 xs:w-auto xs:flex-none">
          <n-avatar
            circle
            class="h-12 w-12 md:h-24 md:w-24 sm:h-18 sm:w-18 xs:h-16 xs:w-16"
            :src="avatar"
          />
        </div>
        <div class="flex flex-col flex-1" p-2>
          <div class="mb-1 flex-none text-sm-title md:text-base-title">
            {{ name }}
          </div>
          <div class="mb-4 flex-auto text-sm sm:mb-6 xs:mb-4 md:text-base">
            {{ email }}
          </div>
          <div class="flex-none">
            <RouterLink to="/user/edit">
              <n-button round quaternary class="prose prose-gray prose-invert !pl-0 !hover:prose !hover:prose-cyan" icon-placement="right">
                <template #icon>
                  <NIcon>
                    <icon-material-symbols:arrow-forward-ios-rounded />
                  </NIcon>
                </template>
                编辑个人信息
              </n-button>
            </RouterLink>
          </div>
        </div>
      </div>
    </n-card>
    <n-menu class="mt-4" :root-indent="0" :indent="16" :options="menuOptions" />
    <n-button type="primary" size="large" round mx-12 my-12>
      {{ $t('user.profile.logout') }}
    </n-button>
  </common-page>
</template>
