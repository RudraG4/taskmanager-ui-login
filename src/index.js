import Vanilla from "./vanilla/Vanilla"
import App from "./components/app-view"

addEventListener('load', () => Vanilla.render(App, document.getElementById('app')))