<template>
  <div id="page-header">
    <header class="header">
      <div class="container text-center text-md-left">
        <router-link class="navbar-brand navbar-text text-hide float-left" to="/" exact>Урюпинск.Онлайн</router-link>
        <div class="nav-social justify-content-end d-none d-md-flex">
          <ul>
            <li><a href="#"><i class="fa fa-rss-square fa-fw" data-placement="bottom" title="" data-original-title="Subscribe to Our RSS Feed"></i></a></li>
            <li class="last"></li>
          </ul>
        </div>
      </div>
    </header>


    <b-navbar toggleable="sm" class="nav-menu">
      <b-container>
        <b-navbar-toggle target="nav_collapse"/>
        <b-collapse is-nav id="nav_collapse">
          <b-navbar-nav pills>
            <b-nav-item-dropdown 
              class="menu-citizens"
              text="Жителям"
              id="navbarDropdownAborigens">
              <b-dropdown-item to="/transport/taxi/">Такси</b-dropdown-item>
              <b-dropdown-item>Справочник организаций</b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item class="menu-tourists">Гостям</b-nav-item>
            <b-nav-item class="menu-business last">Бизнесу</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>


  </div>
</template>

<style lang="scss">
@import "~styles/variables";

@mixin navbar-colored-menu($color) {
  background: $color;

  &.show>a, .dropdown-menu {
    background: $color;
  }
}

header.header {
  border-color: transparent;
  padding: 0;
  border-bottom: $navbar-border;
  background: rgba(237,237,237,0.88);
  height: 44px;

  a.navbar-brand.text-hide{
    background-image: url("~assets/logo.svg");
    width: 240px;
    height: 44px;
    background-repeat: no-repeat;
    background-position: center;
  }

  ul{
    list-style: none;
  }

}

nav.nav-menu {
  border-color: transparent;
  padding: 0;
  border-bottom: $navbar-border;
  background: rgba(0,147,221,0.88);
  @media (max-width: 767px) {
    background-color:transparent;
    border-bottom: none;
  }

  list-style: none;

  li.nav-item{
    float: left;
    padding: 0 15px 0 0;
    border-left: $navbar-border;

    @media (max-width: 767px) {
      width: 100%;
    }

    &.last{
      border-right: $navbar-border;
    }

    &>a.nav-link{
      line-height: 48px;
      padding: 0 24px;
    }

    .dropdown-menu{
      border: $navbar-border;

      &.show{
        background-color: #fff;
      }

      a.menu-item {
        width: 100%;
        border: none;
      }
    }

    a, .dropdown-menu a {
      font-family: "Montserrat", "Helvetica Neue", Helvetica, Arial, sans-serif;
      text-transform: uppercase;
      font-weight: 400;
      letter-spacing: 1px;
      color: white !important;
      background: transparent;

      &:hover,&:focus {
        color: #fed136;
        outline: none;
      }
    }


    &.menu-citizens {
      @include navbar-colored-menu($citizens-bg);
    }

    &.menu-business, &.menu-business.open {
      @include navbar-colored-menu($business-bg);
    }

    &.menu-tourists, &.menu-tourists.open {
      @include navbar-colored-menu($tourists-bg);
    }
  }

}

.navbar-custom {
  border-color: transparent;
  padding: 0;
  border-bottom: $navbar-border;
  background: rgba(0,147,221,0.88);
  @media (max-width: 767px) {
    background-color:transparent;
    border-bottom: none;
  }

  .navbar-brand:hover,
  .navbar-brand:focus,
  .navbar-brand:active,
  .navbar-brand.active {
    color: #fec503;
  }
  .navbar-collapse {
    border-color: rgba(255, 255, 255, 0.02);
  }

  .navbar-toggler {

    background-color: $primary-color;

    @media (max-width: 767px){
      position: absolute;
      right: 0;
      top: -40px;
      border: 0px;
    }
  }

  .navbar-toggler-icon {
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(255, 255, 255, 1)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
  }
}
</style>
