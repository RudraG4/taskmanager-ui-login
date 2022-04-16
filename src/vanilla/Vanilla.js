
const typeOf = (element) => {
    return Object.prototype.toString.call(element)
}

var createChildren = (vnode, children) => {
    if (children) {
        if (typeOf(children) == '[object Object]') {
            if (children.render) {
                Vanilla.render(children, vnode);
            }
        } else if (typeOf(children) == '[object String]') {
            vnode.textContent = children;
        } else if (typeOf(children) == '[object Array]') {
            children.forEach((child) => {
                vnode = createChildren(vnode, child);
            })
        } else {
            vnode.append(children);
        }
    }
    return vnode;
}

const Vanilla = {
    createElement: function (tag, attributes, children) {
        let vnode = document.createElement(tag);

        if (attributes) {
            if (typeOf(attributes) == '[object Object]') {
                // if has attributes, assign it
                if (attributes.hasOwnProperty('attr')) {
                    if (typeOf(attributes.attr == '[object Object]')) {
                        for (const attribute in attributes.attr) {
                            let value = attributes.attr[attribute];
                            if (attribute.startsWith('data')) {
                                vnode.dataset[attribute.replace('data-', '')] = value;
                            } else if (attribute == 'style') {
                                for (const styleAttr in value) {
                                    vnode.style[styleAttr] = value[styleAttr];
                                }
                            } else {
                                vnode[attribute] = value;
                            }
                        }
                    } else {
                        throw new Error("Expected 'attr' to be of type Object, recieved a different type")
                    }
                }

                // if has class, add classes
                if (attributes.hasOwnProperty('class')) {
                    if (typeOf(attributes.class) == '[object Array]') {
                        vnode.classList.add(...attributes.class);
                    } else if (typeOf(attributes.class) == '[object String]') {
                        vnode.classList.add(...attributes.class.split(/\s/));
                    } else {
                        throw new Error("Expected 'class' to be of type Object, recieved a different type")
                    }
                }

                // if has event handlers, assign onxxx event handlers
                if (attributes.hasOwnProperty('on')) {
                    if (typeOf(attributes.on) == '[object Object]') {
                        for (const event in attributes.on) {
                            if (typeOf(attributes.on[event]) == '[object Function]') {
                                vnode.addEventListener(event, attributes.on[event], false);
                            }
                        }
                    } else {
                        throw new Error("Expected 'on' to be of type Object, recieved a different type")
                    }
                }
            } else {
                vnode = createChildren(vnode, attributes);
            }
        }

        if (children) {
            vnode = createChildren(vnode, children);
        }

        return vnode;
    },
    render: function (component, element) {
        if (element && component) {
            if (component.render) {
                const vnode = {
                    el: element,
                    $render: component.render,
                    $mounted: component.mounted,
                    data: component.data,
                    ...component.methods,
                    ...component.data
                };
                element.append(vnode.$render(this.createElement));
                vnode.$mounted && vnode.$mounted();
            }
        } else {
            throw new Error('component or elementid is missing');
        }
    }
}

export default Vanilla;