<template>
  <Card :class=[className,typeClassName]>
    <template v-for="(_, name) in slots" #[name]="slotData">
      <div v-if='category !== "" && (name == "default" || name == "content")' :key="name" v-bind="slotData">
          <div v-if="showFilterActions" class="t-card__filter">
            <slot name="filter"></slot>
          </div>
          <div v-if="showDateContent" class="t-card__category_date">
            <slot name="date"></slot>
          </div>
          <div class="t-card__chart"> 
            <slot></slot>
          </div> 
      </div>
      <slot v-else :name="name" v-bind="slotData" />
    </template>
    
  </Card>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';
import { Card } from 'tdesign-vue-next/esm/card';
import { TNode } from 'tdesign-vue-next/esm/common';
type categoryActionsType = string | TNode

export default defineComponent({
  name: 'TCard',
  components: {
    Card,
  },
  props: {
    varient: {
      type: String,
      default: () => 'module'
    },
    category: {
      type: String,
      default: () => ''
    },
  },
  setup(props, { slots }) {
    let className = ''
    if(props.varient === 'interface'){
      className = 't-card--interface'
    }
    
    let typeClassName = '';
    if(props.category === 'small'){
      typeClassName = 't-card--padding-s'
    }else if(props.category === 'large'){
      typeClassName = 't-card--padding-l'
    }
    
    const showFilterActions = computed(() =>  !!slots.filter);
    const showDateContent = computed(() => !!slots.date);
    return {
      showFilterActions,
      showDateContent,
      typeClassName,
      className,
      slots,
    };
  },
});
</script>