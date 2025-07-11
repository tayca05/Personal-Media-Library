<template>
  <div class="main">
    <section class="homepage">
      <h1>This is your</h1>
      <h1>Personal Media Library</h1>
      <h2>Save your favorite Movies, Music, and Books in one place!</h2>
      <br><br>
      <div class="about">
        <h2>About</h2>
        <p>
          Search for movies, music, and books. Save them to your library and access them anytime!<br>
          - Use the labels at the nav bar to see currently logged in media items and
          add new items through the top right button. 
        </p>
      </div>
    </section>

  </div>
</template>

<style>
  .main {
    display: flex;
    flex-direction: column; /* stack header + section vertically */
    gap: 0.3rem;
  }

  .homepage {
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
    width: 100vw;
    background-color: #2c3e50;
    padding-top: 9rem;
    text-align: center;
  }

  header, section {
    margin-bottom: 30px;
  }

  .about {
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
    width: 100vw;
    background-color: #3c4e61;
    padding-top: 2rem;
    padding-bottom: 2rem;
    text-align: center;
  }
</style>

