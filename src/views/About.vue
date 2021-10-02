<template>
  <div class="about">
    <el-avatar class="avatar" :size="72" src="https://avatars.githubusercontent.com/u/46557266?v=4"></el-avatar>
    <p class="about-me">
      ← This is me and this ↓ is
      <a
        class="link"
        href="https://github.com/mat2ja/crypto-price-something"
        target="_blank"
      >my code</a>
    </p>
  </div>
</template>

<style lang="scss" scoped>
.about {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3.2rem 0;
  gap: 2.4rem;
}

.about-me {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}
.link {
  text-align: center;
  display: block;
  font-weight: bold;
}
</style>
