import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from "axios";

interface Item {
  id?: string;
  Name?: string;
  ProductName?: string;
  [key: string]: any;
}

export const useDataStore = defineStore("data", () => {
  // State
  const items = ref<Item[]>([]);
  const sortBy = ref<string>("");
  const sortOrder = ref<"asc" | "desc">("asc");
  const searchQuery = ref<string>("");
  const apiURL = ref<string>("");

  // Set API URL
  const SetApi = (url: string) => {
    apiURL.value = url;
  };

  // Fetch data from API
  const fetchData = async () => {
    if (!apiURL.value) return;
    try {
      console.log("🔄 Fetching data...");
      const response = await axios.get<Item[]>(apiURL.value);
      items.value = response.data || [];
      console.log("✅ Data loaded successfully.");
    } catch (error) {
      alert("❌ Error loading data!");
    }
  };

  // Getter: Sort & Search
  const sortedItems = computed<Item[]>(() => {
    let list = items.value;
    if (searchQuery.value) {
      list = list.filter((item) =>
        item.Name?.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    }
    if (!sortBy.value) return list;
    return [...list].sort((a, b) => {
      const valA = a[sortBy.value] ? a[sortBy.value].toString() : "";
      const valB = b[sortBy.value] ? b[sortBy.value].toString() : "";
      const result = valA.localeCompare(valB);
      return sortOrder.value === "asc" ? result : -result;
    });
  });

  // Actions
  const toggleSort = (columnKey: string) => {
    if (sortBy.value === columnKey) {
      sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
    } else {
      sortBy.value = columnKey;
      sortOrder.value = "asc";
    }
  };

  const setSearchQuery = (query: string) => {
    searchQuery.value = query;
  };

  const saveItem = async (newItem: Item): Promise<boolean> => {
    if (!apiURL.value) return false;
    try {
      if (!newItem.Name && !newItem.ProductName) {
        alert("❌ Please enter complete information!");
        return false;
      }

      if (newItem.id) {
        await axios.put(`${apiURL.value}/${newItem.id}`, newItem);
        items.value = items.value.map((item) =>
          item.id === newItem.id ? newItem : item
        );
        alert("✅ Update Successfully!");
      } else {
        const response = await axios.post<Item>(apiURL.value, newItem);
        items.value.push(response.data);
        alert("✅ Added Successfully!");
      }
      return true;
    } catch (error) {
      alert("❌ Can't save item!");
      return false;
    }
  };

  const deleteItem = async (itemId: string) => {
    if (!apiURL.value) return;
    try {
      await axios.delete(`${apiURL.value}/${itemId}`);
      items.value = items.value.filter((item) => item.id !== itemId);
      alert("✅ Deleted successfully!");
    } catch (error) {
      console.error("❌ Delete error:", error);
    }
  };

  const deleteMultipleItems = async (selectedIds: string[]) => {
    if (selectedIds.length === 0) {
      alert("ℹ️ No items selected!");
      return;
    }

    const isConfirmed = confirm(`🛑 Delete ${selectedIds.length} items?`);
    if (!isConfirmed) return;

    console.log("🗑️ Deleting items...");
    try {
      for (const id of selectedIds) {
        await axios.delete(`${apiURL.value}/${id}`);
        items.value = items.value.filter((item) => item.id !== id);
      }
      await fetchData();
      alert("✅ Deleted successfully!");
    } catch (error) {
      console.error("❌ Delete error:", error);
      alert("❌ Failed to delete!");
    }
  };

  const updateItem = async (id: string, updatedData: Partial<Item>) => {
    try {
      const response = await axios.put<Item>(
        `${apiURL.value}/${id}`,
        updatedData
      );
      return response.data;
    } catch (error) {
      console.error("❌ Update error:", error);
      throw error;
    }
  };

  return {
    items,
    sortBy,
    sortOrder,
    searchQuery,
    SetApi,
    sortedItems,
    toggleSort,
    setSearchQuery,
    saveItem,
    deleteItem,
    deleteMultipleItems,
    fetchData,
    updateItem,
  };
});
