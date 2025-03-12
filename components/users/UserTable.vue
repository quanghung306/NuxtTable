<template>
  <ThemeSwitcher />
  <div>
      <div class="card">
          <Toolbar class="mb-6">
              <template #start>
                  <Button label="New" icon="pi pi-plus" class="mr-2" @click="openNew" />
                  <Button label="Delete" icon="pi pi-trash" severity="danger" outlined @click="confirmDeleteSelected" :disabled="!selectedProducts || !selectedProducts.length" />
              </template>

          </Toolbar>

          <DataTable
              ref="dt"
              v-model:selection="selectedProducts"
              :value="products"
              dataKey="id"
              :paginator="true"
              :rows="10"
              :filters="filters"
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              :rowsPerPageOptions="[5, 10, 25]"
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
          >
              <template #header>
                  <div class="flex flex-wrap gap-2 items-center justify-between">
                      <h4 class="m-0">Manage Products</h4>
                      <IconField>
                          <InputIcon>
                              <i class="pi pi-search" />
                          </InputIcon>
                          <InputText v-model="filters['global'].value" placeholder="Search..." />
                      </IconField>
                  </div>
              </template>

              <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
              <Column field="code" header="Code" sortable style="min-width: 12rem"></Column>
              <Column field="name" header="Name" sortable style="min-width: 16rem"></Column>
              <Column header="Image">
                  <template #body="slotProps">
                      <img :src="`https://primefaces.org/cdn/primevue/images/product/${slotProps.data.image}`" :alt="slotProps.data.image" class="rounded" style="width: 64px" />
                  </template>
              </Column>
              <Column field="price" header="Price" sortable style="min-width: 8rem">
                  <template #body="slotProps">
                      {{ formatCurrency(slotProps.data.price) }}
                  </template>
              </Column>
              <Column field="category" header="Category" sortable style="min-width: 10rem"></Column>
              <Column field="rating" header="Reviews" sortable style="min-width: 12rem">
                  <template #body="slotProps">
                      <Rating :modelValue="slotProps.data.rating" :readonly="true" />
                  </template>
              </Column>
              <Column field="inventoryStatus" header="Status" sortable style="min-width: 12rem">
                  <template #body="slotProps">
                      <Tag :value="slotProps.data.inventoryStatus" :severity="getStatusLabel(slotProps.data.inventoryStatus)" />
                  </template>
              </Column>
              <Column :exportable="false" style="min-width: 12rem">
                  <template #body="slotProps">
                      <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editProduct(slotProps.data)" />
                      <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteProduct(slotProps.data)" />
                  </template>
              </Column>
          </DataTable>
      </div>
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from '@primevue/core/api';
import { useToast } from 'primevue/usetoast';

onMounted(() => {
  ProductService.getProducts().then((data) => (products.value = data));
});

const toast = useToast();
const dt = ref();
const products = ref();
const productDialog = ref(false);
const deleteProductDialog = ref(false);
const deleteProductsDialog = ref(false);
const product = ref({});
const selectedProducts = ref();
const filters = ref({
  'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
});
const submitted = ref(false);
const statuses = ref([
  {label: 'INSTOCK', value: 'instock'},
  {label: 'LOWSTOCK', value: 'lowstock'},
  {label: 'OUTOFSTOCK', value: 'outofstock'}
]);

const formatCurrency = (value) => {
  if(value)
      return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
  return;
};
const openNew = () => {
  product.value = {};
  submitted.value = false;
  productDialog.value = true;
};
const hideDialog = () => {
  productDialog.value = false;
  submitted.value = false;
};
const saveProduct = () => {
  submitted.value = true;

  if (product?.value.name?.trim()) {
      if (product.value.id) {
          product.value.inventoryStatus = product.value.inventoryStatus.value ? product.value.inventoryStatus.value : product.value.inventoryStatus;
          products.value[findIndexById(product.value.id)] = product.value;
          toast.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
      }
      else {
          product.value.id = createId();
          product.value.code = createId();
          product.value.image = 'product-placeholder.svg';
          product.value.inventoryStatus = product.value.inventoryStatus ? product.value.inventoryStatus.value : 'INSTOCK';
          products.value.push(product.value);
          toast.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
      }

      productDialog.value = false;
      product.value = {};
  }
};
const editProduct = (prod) => {
  product.value = {...prod};
  productDialog.value = true;
};
const confirmDeleteProduct = (prod) => {
  product.value = prod;
  deleteProductDialog.value = true;
};
const deleteProduct = () => {
  products.value = products.value.filter(val => val.id !== product.value.id);
  deleteProductDialog.value = false;
  product.value = {};
  toast.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
};
const findIndexById = (id) => {
  let index = -1;
  for (let i = 0; i < products.value.length; i++) {
      if (products.value[i].id === id) {
          index = i;
          break;
      }
  }

  return index;
};
const createId = () => {
  let id = '';
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for ( var i = 0; i < 5; i++ ) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}
const exportCSV = () => {
  dt.value.exportCSV();
};
const confirmDeleteSelected = () => {
  deleteProductsDialog.value = true;
};
const deleteSelectedProducts = () => {
  products.value = products.value.filter(val => !selectedProducts.value.includes(val));
  deleteProductsDialog.value = false;
  selectedProducts.value = null;
  toast.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
};

const getStatusLabel = (status) => {
  switch (status) {
      case 'INSTOCK':
          return 'success';

      case 'LOWSTOCK':
          return 'warn';

      case 'OUTOFSTOCK':
          return 'danger';

      default:
          return null;
  }
};

</script>
