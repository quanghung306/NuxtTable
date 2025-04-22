<template>
  <div class="card">
    <Toast />
    <ConfirmDialog
      group="headless"
      class="items-center w-[15%] border-b border-surface-200 dark:border-surface-700"
    >
      <template #container="{ message, acceptCallback, rejectCallback }">
        <div
          class="flex flex-col items-center p-8 bg-surface-0 dark:bg-surface-900 rounded"
        >
          <div
            class="rounded-full bg-black text-white inline-flex justify-center items-center h-24 w-24 -mt-20"
          >
            <i class="pi pi-question !text-4xl"></i>
          </div>
          <span class="font-bold text-2xl block mb-2 mt-6 whitespace-nowrap">{{
            message.header
          }}</span>
          <p class="mb-0">{{ message.message }}</p>
          <div class="flex items-center gap-2 mt-6">
            <Button
              label="Delete"
              severity="danger"
              @click="acceptCallback"
            ></Button>
            <Button label="Cancel" outlined @click="rejectCallback"></Button>
          </div>
        </div>
      </template>
    </ConfirmDialog>
    <DataTable
      v-model:selection="selectedProducts"
      v-model:filters="filters"
      :value="products"
      :rows="10"
      paginator 
      :rowsPerPageOptions="[5, 10, 20, 50]"
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
          <component
            :is="column.body ? column.body(data) : 'span'"
          >
            {{ !column.body ? data[column.key] : "" }}
          </component>
        </template>
      </Column>
      <Column>
        <template #body="{ data }">
          <Button
            icon="pi pi-pencil"
            outlined
            rounded
            class="mr-2"
            @click="editProduct(data)"
          />
        </template>
      </Column>
      <!-- class="p-paginator" -->
      <template #paginatorstart>
             
            </template>
    </DataTable>
    <Dialog
      v-model:visible="userStore.isLoading"
      modal
      header="Processing..."
      :closable="false"
    >
      <div class="flex flex-col items-center justify-center p-5">
        <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
        <p class="mt-3">Deleting items, please wait...</p>
      </div>
    </Dialog>
    <Dialog
      v-model:visible="productDialog"
      :style="{ width: '450px' }"
      :header="isEditMode ? 'Edit Product' : 'Add Product'"
      :modal="true"
    >
      <div class="flex flex-col gap-6">
        <div>
          <label for="name" class="block font-bold mb-3">Name</label>
          <InputText
            id="name"
            v-model.trim="selectedProduct.Name"
            required="true"
             placeholder="Enter Name"
            autofocus
            :invalid="submitted && !selectedProduct.Name"
            fluid
          />
          <small v-if="submitted && !selectedProduct.Name" class="text-red-500"
            >Name is required.</small
          >
        </div>
        <div>
          <label for="inventoryStatus" class="block font-bold mb-3"
            >Status</label
          >
          <Select
            id="inventoryStatus"
            v-model="selectedProduct.Status"
            :options="statuses"
            optionLabel="label"
            optionValue="value"
            placeholder="Select a Status"
            fluid
          />
        </div>
        <div>
          <span class="block font-bold mb-4">Category</span>
          <div class="grid grid-cols-12 gap-4">
            <div class="flex items-center gap-2 col-span-6">
              <RadioButton
                id="category1"
                v-model="selectedProduct.Category"
                name="category"
                value="Accessories"
              />
              <label for="category1">Accessories</label>
            </div>
            <div class="flex items-center gap-2 col-span-6">
              <RadioButton
                id="category2"
                v-model="selectedProduct.Category"
                name="category"
                value="Clothing"
              />
              <label for="category2">Clothing</label>
            </div>
            <div class="flex items-center gap-2 col-span-6">
              <RadioButton
                id="category3"
                v-model="selectedProduct.Category"
                name="category"
                value="Electronics"
              />
              <label for="category3">Electronics</label>
            </div>
            <div class="flex items-center gap-2 col-span-6">
              <RadioButton
                id="category4"
                v-model="selectedProduct.Category"
                name="category"
                value="Fitness"
              />
              <label for="category4">Fitness</label>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-6">
            <label for="price" class="block font-bold mb-3">Price</label>
            <InputNumber
              id="price"
              v-model="selectedProduct.Price"
              mode="currency"
              currency="USD"
              placeholder="Enter Price"
              locale="en-US"
              fluid
            />
          </div>
        </div>
      </div>
      <template #footer>
        <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
        <Button label="Save" icon="pi pi-check" @click="saveProduct" />
      </template>
    </Dialog>
  </div>
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
const statuses = ref([
  { label: "INSTOCK", value: "instock" },
  { label: "LOWSTOCK", value: "lowstock" },
  { label: "OUTOFSTOCK", value: "outofstock" },
]);
// Định nghĩa interface cho Column
interface ColumnConfig {
  key: keyof Product;
  header?: string;
  body?: (data: Product) => any;
}
type FilterMode = "startsWith" | "contains" | "endsWith" | "equals";

const filters = ref<{
  global: { value: string | null; matchMode: string };
}>({
  global: { value: null, matchMode: "contains" },
});

const productDialog = ref<boolean>(false);
const isEditMode = ref<boolean>(false);
const selectedProduct = ref<Partial<Product>>({});
const selectedProducts = ref<Product[]>([]);
const submitted = ref<boolean>(false);

const userStore = useDataStore();
const { items: products } = storeToRefs(userStore);
const toast = useToast();

const columns = ref<ColumnConfig[]>([
  { key: "Name", header: "Name" },
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

const openAddDialog = () => {
  selectedProduct.value = {};
  isEditMode.value = false;
  productDialog.value = true;
};

const editProduct = (product: Product) => {
  selectedProduct.value = { ...product };
  isEditMode.value = true;
  productDialog.value = true;
};
const saveProduct = async () => {
  if (!selectedProduct.value.Name) {
    submitted.value = true;
    return;
  }
  if (isEditMode.value) {
    await userStore.updateItem(selectedProduct.value.id!, selectedProduct.value);

    // 🛠 Cập nhật products sau khi update
    const index = products.value.findIndex((product:any) => product.id === selectedProduct.value.id);
    if (index !== -1) products.value[index] = { ...selectedProduct.value };

    toast.add({
      severity: "success",
      summary: "Success",
      detail: "Product updated successfully!",
      life: 3000,
    });
  } else {
    await userStore.saveItem(selectedProduct.value);
    toast.add({
      severity: "success",
      summary: "Success",
      detail: "Product added successfully!",
      life: 3000,
    });
  }

  productDialog.value = false;
  selectedProduct.value = {};
  submitted.value = false;
};


const deleteSelectedUsers = async () => {
  const selectedIds = selectedProducts.value.map((product: any) => product.id!);
  await userStore.deleteMultipleItems(selectedIds);
  selectedProducts.value = [];
};
const hideDialog = () => {
  productDialog.value = false;
};
onMounted(() => {
  userStore.SetApi("https://67d27d4090e0670699bdc271.mockapi.io/products");
  userStore.fetchData();
});
const statusLabels: Record<string, string> = {
  instock: "success",
  lowstock: "warn",
  outofstock: "danger",
};
const getStatusLabel = (status: string) => statusLabels[status] || undefined;

</script>
