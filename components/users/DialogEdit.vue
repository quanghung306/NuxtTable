<!-- <template>
  <Dialog
    :isOpen="isOpen"
    :style="{ width: '450px' }"
    header="Product Details"
    :modal="true"
  >
    <div class="flex flex-col gap-6">
      <img
        v-if="product.Image"
        :src="`https://primefaces.org/cdn/primevue/images/product/${product.Image}`"
        :alt="product.Image"
        class="block m-auto pb-4"
      />
      <div>
        <label for="name" class="block font-bold mb-3">Name</label>
        <InputText
          id="name"
          v-model.trim="product.Name"
          required
          autofocus
          :invalid="submitted && !product.Name"
          fluid
        />
        <small v-if="submitted && !product.Name" class="text-red-500"
          >Name is required.</small
        >
      </div>
      <div>
        <span class="block font-bold mb-4">Category</span>
        <div class="grid grid-cols-12 gap-4">
          <div
            v-for="category in categories"
            :key="category"
            class="flex items-center gap-2 col-span-6"
          >
            <RadioButton
              :id="category"
              v-model="product.Category"
              :name="category"
              :value="category"
            />
            <label :for="category">{{ category }}</label>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-6">
          <label for="price" class="block font-bold mb-3">Price</label>
          <InputNumber
            id="price"
            v-model="product.Price"
            mode="currency"
            currency="USD"
            locale="en-US"
            fluid
          />
        </div>
        <div class="col-span-6">
          <label for="Status" class="block font-bold mb-3">Status</label>
          <InputNumber
            id="quantity"
            v-model="product.Status"
            integeronly
            fluid
          />
        </div>
      </div>
    </div>
    <template #footer>
      <Button label="Cancel" icon="pi pi-times" text @click="$emit('close')" />
      <Button label="Save" icon="pi pi-check" @click="$emit('save')" />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
defineProps<{
  product: Product|any;
  submitted: boolean;
  Status: { label: string; value: string }[];
  categories: string[];
  isOpen: boolean;
}>();

defineEmits(["close", "save"]);

type Product = {
  id?: string;
  Name?: string;
  Image?: string;
  Category?: string;
  Price?: number;
  Status?: number;
};
</script> -->
