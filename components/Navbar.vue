
<template>
    <div class=" card  ">
        <Menubar :model="items" class="p-menubar">
            <template #end>
                <div class="flex items-center gap-2 h-9  ">
                     <CommonAvatarLogin />
                </div>
            </template>
        </Menubar>
    </div>
    
</template>

<script setup>

</script> 
 
<style lang="css" scoped>
.p-menubar{
    border: none;
    box-shadow: 4px 2px 2px 2px rgba(161, 161, 161, 0.1);
}
</style>