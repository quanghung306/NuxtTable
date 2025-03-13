
<template>
 <div  class="flex relative ">
   <SideMenu />
   <div  class="flex-1 w-screen" >
     <Navbar /> 
      <main class="p-4">
        <slot/> 
      </main>
    </div>
  </div>
</template>
