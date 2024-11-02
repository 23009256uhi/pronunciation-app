<template>
  <nav class="navbar">
    <div class="sticky">
      <div class="logo">
        <img :src="logoIcon" alt="icon" class="logo-icon" />
        <span>LinguaAI</span>
      </div>
      <ul class="ul">
        <li>
          <router-link class="link" to="/" @click="toggleSidebar"
            >Home</router-link
          >
        </li>
        <li>
          <router-link class="link" to="/conversation" @click="toggleSidebar"
            >Conversation</router-link
          >
        </li>
        <li>
          <router-link class="link" to="/about" @click="toggleSidebar"
            >About</router-link
          >
        </li>
      </ul>
      <button v-if="isSidebarOpen" class="close-button" @click="toggleSidebar">
        X
      </button>
    </div>
  </nav>
</template>

<script>
import logoIcon from "../assets/logo.svg";
export default {
  name: "NavbarComponent",
  props: {
    isSidebarOpen: {
      type: Boolean,
      required: true,
    },
    toggleSidebar: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      logoIcon,
    };
  },
};
</script>

<style scoped>
.navbar {
  background-color: var(--navbar-bg);
  height: 100%;
  padding: var(--navbar-pd);
  width: 300px;
}

.sticky {
  position: sticky;
  top: 40px;
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

.logo {
  font-size: 3rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 1.8rem;
}

.logo-icon {
  width: 50px;
  height: 50px;
  filter: invert(98%) sepia(2%) saturate(285%) hue-rotate(200deg)
    brightness(94%) contrast(96%);
}

span,
.link {
  color: var(--text-cl);
}

.ul {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}

li {
  list-style-type: none;
}

.link {
  text-decoration: none;
}

.close-button {
  position: absolute;
  top: -30px;
  right: -10px;
  background-color: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: var(--text-cl);
  display: none;
}

@media (max-width: 830px) {
  .close-button {
    display: block;
  }
}
</style>
