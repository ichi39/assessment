'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定した要素の子要素をすべて削除する
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

assessmentButton.onclick = () => {
    const userName = userNameInput.value;
    if(userName.length === 0) {
        return;
    }

    // 診断結果表示エリアの作成
    removeAllChildren(resultDivided);
    const header = document.createElement('h3');
    header.innerText = '診断結果';
    resultDivided.appendChild(header);

    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);

    // ツイートエリアの作成
    removeAllChildren(tweetDivided);
    const anchor = document.createElement('a');
    const hrefValue = 
    'https://twitter.com/intent/tweet?button_hashtag=' +
    encodeURIComponent('あなたのいいところ') +
    '&ref_src=twsrc%5Etfw';
    anchor.setAttribute('href', hrefValue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text', result);
    anchor.setAttribute('data-show-count', 'false');
    anchor.innerText = 'Tweet #あなたのいいところ';
    tweetDivided.appendChild(anchor);

    // widget.js の設定
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);
}

userNameInput.onkeydown = event => {
    if (event.key === 'Enter') {
        assessmentButton.onclick();
    }
}

const answers = [
    '{userName}のいいところは、重いところです。{userName}の重さは体力です',
    '{userName}のいいところは、かわいいところです。{userName}の可愛さは正義です',
    '{userName}のいいところは、賢いところです。{userName}のかしこさは素敵です',
    '{userName}のいいところは、笑顔です。{userName}の笑顔はみんなを幸せにします'
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName 
 * @return {string} 診断結果
 */
 function assessment(userName) {
     // 全文字のコード番号を足し合わせる
    let sumOnCharCode = 0;
    for (let i=0; i < userName.length; i++) {
        sumOnCharCode = sumOnCharCode + userName.charCodeAt(i);
    }

    // 文字のコード番号を回答の数で割り、添字の数値を求める
    const index = sumOnCharCode % answers.length;
    let result = answers[index];
    result = result.replace(/\{userName\}/g, userName);

    return result;
}

console.log(assessment('太郎'));
console.assert(
    assessment('太郎') === 
    '太郎のいいところは、かわいいところです。太郎の可愛さは正義です',
    '診断結果の文言が正しくありません'
)
