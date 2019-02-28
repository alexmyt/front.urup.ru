<template>
  <div id="page-hader">
    <header class="header">
      <div class="container text-center text-md-left">
        <a class="navbar-brand navbar-text text-hide float-left" href="/">Урюпинск.Онлайн</a>
        <div class="nav-social justify-content-end d-none d-md-flex">
          <ul>
            <li><a href="#"><i class="fa fa-rss-square fa-fw" data-placement="bottom" title="" data-original-title="Subscribe to Our RSS Feed"></i></a></li>
            <li class="last"></li>
          </ul>
        </div>
      </div>
    </header>

    <nav id="mainNav" class="navbar navbar-expand-md navbar-default navbar-custom">
      <div class="container">
        <div class="nav-wrapper d-flex flex-column flex-md-row w-100 justify-content-between">

          <div class="collapse navbar-collapse order-2 order-md-1" id="navbarSupportedContent">
            <ul class="navbar-nav">
              <li class="nav-item menu-citizens dropdown first">
                <a class="nav-link dropdown-toggle" data-toggle="dropdown" id="navbarDropdownAborigens" role="button"
                  aria-haspopup="true" aria-expanded="false" href="#sitizens">Жителям</a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdownAborigens">
                  <li><a class="dropdown-item" href="/transport/taxi">Такси</a></li>
                  <li><a class="dropdown-item" href="/business">Справочник организаций</a></li>
                </ul>
              </li>
              <li class="nav-item menu-business">
                <a class="nav-link" href="#portfolio">Бизнесу</a>
              </li>
              <li class="nav-item menu-tourists last">
                <a class="nav-link" href="#about">Туристам</a>
              </li>
            </ul>
          </div>


          <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Показать навигацию">
            <span class="navbar-toggler-icon"></span>
          </button>

        </div>
      </div>
    </nav>
  </div>
</template>

<style lang="scss">
@import "~styles/variables";

@mixin navbar-colored-menu($color) {
  background: $color;

  &.open>a, ul.dropdown-menu {
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
    background-image: url('/images/logo.svg');
    width: 240px;
    height: 44px;
    background-repeat: no-repeat;
    background-position: center;
  }

  ul{
    list-style: none;
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

  .navbar-brand {
    color: $primary-color;
    font-size: 2em;
    font-family: Comfortaa, Arial, cursive;
    display: block;
    @media (max-width: 767px) {
      display: none;
    }
  }

  .two-rows-nav{
    display: flex;
    flex-direction: column;
  }

  .tool-bar{
    float:left;
    //width: 75%;
    font-family: "Century Gothic", Futura, sans-serif;
    font-size: 0.833em;

    border-left: $navbar-border;
    border-bottom: $navbar-border;

    ul{
      list-style: none;
    }
  }

  ul.navbar-nav{
    list-style: none;
    margin: 0;
    padding: 0;
    //width: 100%;
    clear: none;

    li{
      float: left;
      padding: 0 15px 0 0;
      border-left: $navbar-border;

      @media (max-width: 767px) {
        width: 100%;
      }

      &.last{
        border-right: $navbar-border;
      }
    }

    &>li>a.nav-link{
      line-height: 48px;
      padding: 0 24px;
    }

  }

  .nav-social{
    font-size: 14px;
  }

  .nav-search{
    width: 50%;
    @media (max-width: 767px) {
      width: 100%;
    }
  }


  .navbar-nav{
    //width: 75%;


    li{

      ul.dropdown-menu{
        border: $navbar-border;

        &.show{
          background-color: #fff;
        }

        li {
          width: 100%;
          border: none;
        }
      }

      a, .dropdown-menu li a {
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
