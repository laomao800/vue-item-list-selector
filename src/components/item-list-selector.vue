<template>
  <div class="item-selector">
    <div class="item-selector__searchbar">
      <div class="item-selector__searchbar-inner">
        <div class="item-selector__searchbar-icon">
          <span class="clean" v-if="keyword !== ''" @click="keyword = ''"><i class="fa fa-times"></i></span>
          <span v-else><i class="fa fa-search"></i></span>
        </div>
        <input autofocus type="text" :placeholder="searchText" v-model.trim="keyword" @keyup="handleSearchInput($event)">
      </div>
    </div>
    <div class="item-selector__result">
      <ul class="item-selector__options">
        <li v-for="item, index in showingData" class="item-selector__option"
          :class="{
            'option-checked': isSelected(item),
            'option-active': index === optionActiveIndex
          }"
          v-html="highlightMatch(optionTemplate(item))"
          @click="toggleSelection(index)" />
        <li v-if="showingData.length === 0" class="item-selector__option-notfound">{{ notFoundText }}</li>
      </ul>
    </div>
    <div class="item-selector__page">
      <span @click="goPrevPage"
        class="pagelink pagelink-prev"
        :class="{ 'pagelink-disabled': curPage === 1 }">{{ prevPageText }}</span>
      <span class="page-num">
        <span class="cur">{{ curPage }}</span>
        <span class="spe">/</span>
        <span class="total">{{ totalPage }}</span>
      </span>
      <span @click="goNextPage"
        class="pagelink pagelink-next"
        :class="{ 'pagelink-disabled': curPage === totalPage }">{{ nextPageText }}</span>
    </div>
  </div>
</template>

<script lang="ts" src="./item-list-selector.ts"></script>

<style lang="scss" src="./item-list-selector.scss"></style>
