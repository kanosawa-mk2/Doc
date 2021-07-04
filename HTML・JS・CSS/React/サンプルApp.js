// Reactを利用する場合、必ずreactをimportする必要がある。
// コンポーネントでstateを管理するuseStateをimportする
// コンポーネントに副作用を追加するため、useEffectをimportする
import React, { useState, useEffect } from 'react';

function add(a,b){
	return a + b;
}

const Hello = (props) => <h1>Hello, React {props.name}</h1>
const Hello2 = ({name}) => <h1>Hello, React {name}</h1>
const Hello3 = ({id,name}) => <h1>Hello, React {id} {name}</h1>

const Hello4 = ({isReact}) => {
	if(isReact){
		return <h2>Hello, React!!!</h2>;
	} else {
		return  <h2>Hello, Vue.js!!!</h2>;
	}
};

// App コンポーネント
function App() {

	// JSXというJavaScript構文の拡張（JavaScriptに独自の構文を拡張したもの）を利用すれば
	// JavaScriptにHTMLのような構文を書ける。
	// JSXはブラウザでは動作しないので通常のJavaScriptに変換する
	// 必要があるが、CreateReactAppで作成した開発環境では変換も自動で行ってくれる。
	// そのため、こちら側では何もせずにJSXを利用できる（JavaScrtiptにHTMLのような構文を書ける）。
	
	const message = 'React';
	const url = 'https://reactjs.org/';
	
	const data = {
		id:'500',
		name:'太郎'
	}
	
	const isReact = false;
	
	const books=[
		{id:1,title:'React.js&Next.js超入門'},
		{id:2,title:'React開発現場の教科書'},
		{id:3,title:'Reactビギナーズガイド'}
	];
	
	const listItems = books.map(book => <li key={book.id}>{book.title}</li>);
	const listItems2 = library =>
		 books.map(book => (
		 	<li key={book.id}>{library} {book.title}</li>
		 ));
	
	function handleClick(){
		console.log('clicked');
	}
	
	function handleClick2(message){
		console.log('clicked message' + message);
	}
	
	function handleClick3(message){
		return () => console.log('clicked message' + message);
	}

	const [count, setCount] = useState(0)

	// <pid="effectHook"></p>にテキストを描画する副作用。
	// 今回の場合、Appコンポーネントが再描画される度に実行される。
	// 副作用はコンポーネントの描画後に実行されるため、Appコンポーネントが
	// 描画した<pid="effectHook"></p>も操作できる。
	// コンポーネントはstateが更新される度に再描画されるため、Appコンポーネントは
	// countが更新される度に再描画される。そのため、ボタンをクリックする度に
	// Appコンポーネントは再描画され、この副作用も実行される。
	useEffect(()=>{
		document.getElementById('effectHook').innerText = 'You click ked ' + count +' times';
	});

	return (
		<>
		<div>
			<p>Hello {message}</p>
			<p>1 + 2 = {add(1,2)}</p>
			<a href={url}>React</a>
			<Hello name="React" />
			<Hello2 name={message} />
			<Hello3 {...data} />
			<Hello4 isReact={isReact} />
			{isReact&&<p>HelloReact</p>}
			{!isReact&&<p>HelloVue.js</p>}
			{
				//即時関数の中でないとif文は書けないため注意。
				(() => {
					if(isReact){
						return <p>HelloReact</p>;
					}
					
					return<p>HelloVue.js</p>;
				})()
			}
			<ul>
				{
					books.map(book=>(
						//key属性は必ず指定する
						<li key={book.id}>{book.title}</li>
					))
				}
			</ul>
			<ul>{listItems}</ul>
			<ul>{listItems2('Vue.js')}</ul>
			<button onClick={handleClick}>click</button>
			<button onClick={() => handleClick2('React')}>click</button>
			<button onClick={handleClick3('React')}>click</button>
			<a href="https;//reactjs.org/" onClick={handleClick}>React</a>
			
			<p>Count: {count}</p>
			<p id="effectHook"></p>
			<button onClick={()=> setCount(count + 1)}>click</button>
			
		</div>
		</>
	);
}



//他のJavaScriptファイルからimportして利用できるようするため、exportする。
export default App;