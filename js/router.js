export class Router{
  routes = []

  add(routeName, page){
    this.routes[routeName] = page
  }

  route(event) {
    event = event || window.event
    event.preventDefault()
  
    window.history.pushState({}, "", event.target.href)   

    if(event.target.href == "http://localhost:3000/universe"){
      document.querySelector("html").classList.add("universe")
      document.querySelector("html").classList.remove("explorer")
      document.querySelector("a.universe").classList.add("selected")
      document.querySelector("a.home").classList.remove("selected")
      document.querySelector("a.explorer").classList.remove("selected")
    }

    if(event.target.href == "http://localhost:3000/explorer"){
      document.querySelector("html").classList.add("explorer")
      document.querySelector("html").classList.remove("universe")
      document.querySelector("a.universe").classList.remove("selected")
      document.querySelector("a.home").classList.remove("selected")
      document.querySelector("a.explorer").classList.add("selected")
    }

    if(event.target.href == "http://localhost:3000/"){
      document.querySelector("html").classList.remove("explorer")
      document.querySelector("html").classList.remove("universe")
      document.querySelector("a.universe").classList.remove("selected")
      document.querySelector("a.home").classList.add("selected")
      document.querySelector("a.explorer").classList.remove("selected")
    }
    
  
    this.handle()  
  }

  handle(){
    const pathname = window.location.pathname
    const route = this.routes[pathname] || this.routes[404]
    
  
    fetch(route)
      .then(data => data.text())
      .then(html => {
        document.querySelector("#app").innerHTML = html
      }) 
  }
}
