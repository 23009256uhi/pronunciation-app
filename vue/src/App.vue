<template>
  <div id="app">
    <div class="main-container">
      <!-- Hamburger Button -->
      <button
        v-if="!isSidebarOpen"
        class="hamburger-btn"
        @click="toggleSidebar"
      >
        &#9776;
      </button>

      <!-- Sidebar Menu -->
      <div :class="['side-menu', { open: isSidebarOpen }]">
        <Navbar
          :apiUrl="apiUrl"
          :isSidebarOpen="isSidebarOpen"
          :toggleSidebar="toggleSidebar"
        />
      </div>

      <!-- Router View -->
      <router-view />
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from "vue";
import Navbar from "./components/NavbarComponent.vue";

export default {
  name: "App",
  components: {
    Navbar,
  },
  setup() {
    const apiUrl = "https://pronunciation-app.onrender.com";
    const isSidebarOpen = ref(false);

    function toggleSidebar() {
      isSidebarOpen.value = !isSidebarOpen.value;
    }

    function handleResize() {
      if (window.innerWidth > 830) {
        isSidebarOpen.value = false;
      }
    }

    // Hook equivalent to useEffect
    onMounted(() => {
      handleResize();
      window.addEventListener("resize", handleResize);
    });

    // Cleanup event listener
    onBeforeUnmount(() => {
      window.removeEventListener("resize", handleResize);
    });

    return {
      apiUrl,
      isSidebarOpen,
      toggleSidebar,
    };
  },
};
</script>

<style>
#root {
  min-height: 100vh;
  height: 100%;
  font-family: sans-serif;
}

#app {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 100%;
  height: 100%;
}

.main-container {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 1.6rem;
  height: 100%;
}

.side-menu {
  max-width: 300px;
  width: 100%;
  min-height: 100vh;
  position: sticky;
  top: 0;
  transition: transform 0.3s ease;
}

.side-menu.open {
  transform: translateX(0);
}

.hamburger-btn {
  display: none;
  font-size: 30px;
  background: none;
  border: none;
  color: var(--text-cl);
  position: absolute;
  top: 10px;
  left: 10px;
  cursor: pointer;
  z-index: 1100;
}

@media (max-width: 830px) {
  .side-menu {
    transform: translateX(-100%);
    position: fixed;
    z-index: 1000;
    height: 100vh;
  }

  .main-container {
    grid-template-columns: 1fr;
  }

  .side-menu.open + .main-container {
    grid-template-columns: 300px 1fr;
  }

  .hamburger-btn {
    display: block;
  }
}
</style>
