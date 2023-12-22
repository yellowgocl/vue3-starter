<script setup>
import { isString, isObject } from 'lodash'
import { RouterLink } from 'vue-router'
import { NIcon } from 'naive-ui'
import { useUserStore, usePermissionStore } from '@/store'
import { DirectionsCarFilled, AnalyticsFilled, PersonPinSharp, ShareFilled, HomeWorkFilled, SportsScoreFilled, GamepadFilled } from '@vicons/material'
const userStore = useUserStore()
const { avatar, name, email, role } = userStore

const roleColorMap = {
    'admin': 'warning',
    'referee': 'success',
    'player': 'info'
}

function renderLabel(label, route, extenal = false) {
    const to = isString(route) ? { path: route } : { ...(isObject(route) || {}) }
    return () => h(
      RouterLink,
      { to },
      { default: () => label }
    )
}
function renderIcon (icon) {
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
                icon: renderIcon(GamepadFilled)
            },
            {
                label: renderLabel('排行榜', '/ranking'),
                key: 'matchs--ranking',
                icon: renderIcon(SportsScoreFilled)
            },
            {
                label: renderLabel('往绩统计', '/user/score'),
                key: 'matchs--my-car',
                icon: renderIcon(AnalyticsFilled)
            },
            {
                label: renderLabel('我的爱车', '/user/car'),
                key: 'matchs--my-car',
                icon: renderIcon(DirectionsCarFilled)
            }
        ]
    },
    {
        type: 'group',
        label: '杂项相关',
        key: 'utils',
        children: [
            {
                label: renderLabel('邀请参赛', '/event'),
                key: 'utils--share-match',
                icon: renderIcon(ShareFilled)
            },
            {
                label: renderLabel('寻找组织', '/lab'),
                key: 'utils--lab',
                icon: renderIcon(HomeWorkFilled)
            },
            {
                label: renderLabel('我的老友', '/user/friends'),
                key: 'utils--friends',
                icon: renderIcon(PersonPinSharp)
            }
        ]
    }
]

</script>
<template>
    <common-page :show-header="false">
        <n-card 
            class="bg-neutral-900 dark:bg-neutral-300"
            content-class="!pa-3 !sm:pa-4 !md:pa-6"
            footer-style="padding: 0"
            rounded-3>
            <!-- <template #header-extra>
                <n-layout ></n-layout>
                <n-button strong secondary circle type="info">
                    <template #icon>
                        <n-icon :component="CreateFilled"></n-icon>
                    </template>
                </n-button>
            </template> -->
            <template #footer>
                <n-divider class="!mt-[16px] !mb-[16px] !sm:mt-[22px] !sm:mb-[22px]"></n-divider>
                <div class='text-sm md:text-base !pa-3 !sm:pa-4 !md:pa-6 !pt-0 !sm:pt-0 !md:pt-0'>
                        <n-tooltip v-for="item in role" :key="`role-${item}`" placement="bottom" trigger="hover">
                            <template #trigger>
                                <n-button class="mr-1 md:mr-3" :type="roleColorMap[item]" ghost size="tiny" round >{{ item }}</n-button>
                                <!-- <n-button class='h-6 sm:h-8 text-xs md:text-sm mb-1 text-cyan-200 dark:text-cyan-800 mr-1 md:mr-3' 
                                    round
                                    ghost
                                    size="tiny"
                                    type="info" 
                                    :bordered="false"> 
                                    {{ item }} 
                                </n-button> -->
                            </template>
                            <span> {{ item }} </span>
                        </n-tooltip>
                    </div>
            </template>
            <div class="flex flex-wrap flex-row xs:flex-nowrap prose prose-gray prose-invert" >
                <div class="w-full flex-auto mr-0 mb-3 xs:w-auto xs:mr-6 xs:mb-0 xs:flex-none">
                    <n-avatar
                        circle
                        class='w-12 h-12 xs:w-16 xs:h-16 sm:w-18 sm:h-18 md:w-24 md:h-24'
                        :src='avatar'>
                    </n-avatar>
                </div>
                <div class="flex-1 flex flex-col" p-2>
                    <div class='mb-1 flex-none text-sm-title md:text-base-title'>{{ name }}</div>
                    <div class='mb-4 xs:mb-4 sm:mb-6 flex-auto text-sm md:text-base'>{{ email }}</div>
                    <div class="flex-none">
                        <RouterLink to="/user/edit">
                        <n-button round quaternary class="!pl-0 prose prose-gray prose-invert !hover:prose !hover:prose-cyan" icon-placement="right">
                            <template #icon>
                                <n-icon>
                                    <icon-material-symbols:arrow-forward-ios-rounded />
                                </n-icon>
                            </template>
                            编辑个人信息
                        </n-button>
                    </RouterLink>
                    </div>
                </div>
            </div>
        </n-card>
        <n-menu class="mt-4" :root-indent="0" :indent="16" :options="menuOptions" />
    </common-page>
</template>