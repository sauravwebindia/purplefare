export const stickyHeader = () => {
    let number =
        window.pageXOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
    const header = document.getElementById('headerSticky');
    if (header !== null) {
        if (number >= 300) {
            header.classList.add('header--sticky');
        } else {
            header.classList.remove('header--sticky');
        }
    }
};

export const generateTempArray = (maxItems) => {
    let result = [];

    for (let i = 0; i < maxItems; i++) {
        result.push(i);
    }
    return result;
};

export function formatCurrency(num) {
    if (num !== undefined) {
        return parseFloat(num)
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    } else {
    }
}



	
const isDate = (val) => {
	// Cross realm comptatible
	return Object.prototype.toString.call(val) === '[object Date]'
}

const isObj = (val) => {
	return typeof val === 'object'
}

const stringifyValue = (val) => {
	if (isObj(val) && !isDate(val)) {
	  return JSON.stringify(val)
	} else {
	  return val
	}
}

const buildForm = ({ action, params }) => {
	const form = document.createElement('form')
	form.setAttribute('method', 'post')
	form.setAttribute('action', action)  
	Object.keys(params).forEach(key => {
	  const input = document.createElement('input')
	  input.setAttribute('type', 'hidden')
	  input.setAttribute('name', key)
	  input.setAttribute('value', stringifyValue(params[key]))
	  form.appendChild(input)
	})  
	return form;
}

export const postForm = (details) => {
	const form = buildForm(details)
	document.body.appendChild(form)
	form.submit()
	form.remove()
}
