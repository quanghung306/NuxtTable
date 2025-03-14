<template>
  <div class="card">
    <Toast />
    <ConfirmDialog group="headless" class=" items-center w-[15%]  border-b border-surface-200 dark:border-surface-700">
      <template #container="{ message, acceptCallback, rejectCallback }">
        <div class="flex flex-col items-center p-8 bg-surface-0 dark:bg-surface-900 rounded">
                <div class="rounded-full bg-black text-white inline-flex justify-center items-center h-24 w-24 -mt-20">
                    <i class="pi pi-question !text-4xl"></i>
                </div>
        <span class="font-bold text-2xl block mb-2 mt-6  whitespace-nowrap">{{ message.header }}</span>
        <p class="mb-0">{{ message.message }}</p>
                <div class="flex items-center gap-2 mt-6">
                    <Button label="Delete" severity="danger" @click="acceptCallback"></Button>
                    <Button label="Cancel" outlined @click="rejectCallback"></Button>
                </div>
              </div>
      </template>
    </ConfirmDialog>
    <DataTable
      v-model:selection="selectedProducts"
      v-model:filters="filters"
      :value="products"
      paginator
      :rows="10"
      tableStyle="min-width: 50rem"
      filterDisplay="menu"
      :globalFilterFields="['Name']"
    >
      <template #header>
        <div class="flex flex-wrap items-center justify-between gap-2">
          <span class="text-xl font-bold">Products</span>
          <IconField>
            <InputIcon>
              <i class="pi pi-search" />
            </InputIcon>
            <InputText
              v-model="filters['global'].value"
              placeholder="Keyword Search"
            />
            <Button
              label="New"
              icon="pi pi-plus"
              class="ml-3"
              @click="openAddDialog"
            />
            <Button
              label="Delete"
              icon="pi pi-trash"
              severity="danger"
              outlined
              class="ml-3"
               @click="deleteSelectedUsers"
              :disabled="!selectedProducts || !selectedProducts.length"
            />
          </IconField>
        </div>
      </template>
      <Column
        selectionMode="multiple"
        style="width: 3rem"
        :exportable="false"
      ></Column>
      <Column
        v-for="column in columns"
        :sortable="true"
        :key="column.key"
        :field="column.key"
        :header="column.header || column.key"
      >
        <template #body="{ data }">
          <component :is="column.body ? column.body(data) : 'span'">
            {{ !column.body ? data[column.key] : "" }}
          </component>
        </template>
        
      </Column>
      <Column >
          <template  #body="{ data }">
            <Button
              icon="pi pi-pencil"
              outlined
              rounded
              class="mr-2"
              @click="editProduct(data.Product)"
            />
          </template>
        </Column>
      <!-- <template #footer>
        In total there are {{ products.length }} products.
      </template> -->
    </DataTable>
    <Dialog v-model:visible="userStore.isLoading" modal header="Processing..." :closable="false">
    <div class="flex flex-col items-center justify-center p-5">
      <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
      <p class="mt-3">Deleting items, please wait...</p>
    </div>
  </Dialog>
  </div>
  <!-- <UsersDialogEdit
    v-if="isDialogOpen"
    :product="productDialog"
    :submitted="submitted"
    :Status="[
      { label: 'In Stock', value: 'in-stock' },
      { label: 'Out of Stock', value: 'out-of-stock' },
    ]"
    :categories="['Accessories', 'Clothing', 'Electronics', 'Fitness']"
    :isOpen="isDialogOpen"
    @save="handleSave"
    @close="closeDialog"
  /> -->
</template>

<script setup lang="ts">
// Định nghĩa interface cho Product
interface Product {
  id: string;
  Name: string;
  Image: string;
  Price: number;
  Category: string;
  Status: string;
}

// Định nghĩa interface cho Column
interface ColumnConfig {
  key: keyof Product;
  header?: string;
  body?: (data: Product) => any;
}
type FilterMode = "startsWith" | "contains" | "endsWith" | "equals";
const filters = ref<{
  global: { value: string | null; matchMode: FilterMode };
}>({
  global: { value: null, matchMode: "contains" },
});
const selectedItems = ref<string[]>([]);
const isDialogOpen = ref<boolean>(false);
// Lấy dữ liệu từ store
const userStore = useDataStore();
const { items: products } = storeToRefs(userStore);
const selectedProduct = ref<Product | Partial<Product>>({});
  const selectedProducts = ref<string[]>([]);
// Định nghĩa các cột động
const columns = ref<ColumnConfig[]>([
  { key: "Name", header: " Name" },
  {
    key: "Image",
    header: "Image",
    body: (data: Product) =>
      h("img", {
        src: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.id}`,
        alt: "User Avatar",
        class: "h-10 w-10 rounded-full mr-2",
      }),
  },
  { key: "Price", header: "Price" },
  { key: "Category", header: "Category" },
  { key: "Status", header: "Status" },
]);
const editProduct = (product:Product) => {
  selectedProduct.value = { ...product };
  isDialogOpen.value = true;
};
const openAddDialog = () => {
  selectedItems.value = [];
  isDialogOpen.value = true;
};
// const closeDialog = () => {
//   isDialogOpen.value = false;
// };
// const handleSave = (updatedUser: Product) => {
//   if (updatedUser.id) {
//     userStore.updateItem(updatedUser.id, updatedUser);
//   }
//   closeDialog();
// };
const deleteSelectedUsers = () => {
  const selectedIds = selectedProducts.value.map((product:any) => product.id);
  userStore.deleteMultipleItems(selectedIds);
  selectedProducts.value = [];
};


onMounted(() => {
  userStore.SetApi("https://67d27d4090e0670699bdc271.mockapi.io/products");
  userStore.fetchData();
});
</script>
