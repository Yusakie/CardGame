class Card {
    constructor(name, rarity, description, probability, value, image) {
        this.name = name;
        this.rarity = rarity;
        this.description = description;
        this.probability = probability;
        this.value = value;
        this.image = image;
    }
}

class DrawRecord {
    constructor(cards) {
        this.cards = cards;
    }
}

// 稀有度常量
const RARITIES = {
    N: 'N',
    R: 'R',
    SR: 'SR',
    SSR: 'SSR'
};

// 初始货币
let currency = 1000;
// 每次抽卡所需货币
const drawCost = 100;
// 背包
let backpack = [];
// 抽卡历史记录
let drawHistory = [];
// 抽卡冷却标志
let isDrawing = false;
// 缓存稀有度筛选结果
const rarityCache = {};

window.addEventListener('DOMContentLoaded', function () {
    loadGameData();
    showMainGamePage();
    document.getElementById('buttons').addEventListener('click', function (e) {
        switch (e.target.id) {
            case 'drawBtn':
                drawCards();
                break;
            case 'viewCardPoolBtn':
                toggleSection('cardPoolInfo');
                break;
            case 'viewBackpackBtn':
                updateBackpackDisplay();
                toggleSection('backpackInfo');
                break;
            case 'viewHistoryBtn':
                displayHistory();
                toggleSection('historyInfo');
                break;
            case 'clearDataBtn':
                if (confirm('确定要清除数据吗？')) {
                    clearData();
                }
                break;
        }
    });
    updateTitleFontSize();
    window.addEventListener('resize', updateTitleFontSize);
});

// 更新标题字体大小
function updateTitleFontSize() {
    const title = document.querySelector('h1');
    const screenWidth = window.innerWidth;
    let fontSize;
    if (screenWidth < 600) {
        fontSize = '20px';
    } else if (screenWidth >= 600 && screenWidth < 1000) {
        fontSize = '30px';
    } else {
        fontSize = '40px';
    }
    title.style.fontSize = fontSize;
}

// 显示主游戏页面
function showMainGamePage() {
    updateCurrencyDisplay();
    displayCardPoolInfo();
}

// 更新货币显示
function updateCurrencyDisplay() {
    document.getElementById('currencySpan').textContent = currency;
}

// 抽卡函数
function drawCards() {
    if (isDrawing) return;
    if (currency < drawCost) {
        return;
    }
    isDrawing = true;
    currency -= drawCost;
    updateCurrencyDisplay();

    const drawnCards = [];
    for (let i = 0; i < 4; i++) {
        let randomNumber = Math.random();
        let card;
        if (randomNumber < 0.05) {
            card = getRandomCardByRarity(RARITIES.SSR);
        } else if (randomNumber < 0.25) {
            card = getRandomCardByRarity(RARITIES.SR);
        } else if (randomNumber < 0.6) {
            card = getRandomCardByRarity(RARITIES.R);
        } else {
            card = getRandomCardByRarity(RARITIES.N);
        }
        drawnCards.push(card);
    }

    // 检查是否至少有 1 张 R 级以上的卡牌
    const hasRRankOrAbove = drawnCards.some(card => card.rarity === RARITIES.SSR || card.rarity === RARITIES.SR || card.rarity === RARITIES.R);
    if (!hasRRankOrAbove) {
        // 如果没有，强制添加一张 R 级卡牌
        const rCard = getRandomCardByRarity(RARITIES.R);
        drawnCards.push(rCard);
    }

    // 将抽到的卡牌添加到背包，并更新数量
    drawnCards.forEach(card => {
        let found = false;
        for (let i = 0; i < backpack.length; i++) {
            if (backpack[i].card.name === card.name) {
                backpack[i].count++;
                found = true;
                break;
            }
        }
        if (!found) {
            backpack.push({ card, count: 1 });
        }
    });

    drawHistory.push(new DrawRecord(drawnCards));
    displayDrawResult(drawnCards);
    updateBackpackDisplay();
    playDrawSound();
    setTimeout(() => {
        isDrawing = false;
    }, 2000);
}

// 根据稀有度获取随机卡牌
function getRandomCardByRarity(rarity) {
    if (!rarityCache[rarity]) {
        rarityCache[rarity] = window.cards.filter(card => card.rarity === rarity);
    }
    const filteredCards = rarityCache[rarity];
    const randomIndex = Math.floor(Math.random() * filteredCards.length);
    return filteredCards[randomIndex];
}

// 显示抽卡结果
function displayDrawResult(cards) {
    const drawResultDiv = document.getElementById('drawResult');
    drawResultDiv.innerHTML = '<h3>本次抽卡结果：</h3>';
    const fragment = document.createDocumentFragment();
    cards.forEach(card => {
        const img = document.createElement('img');
        img.src = card.image;
        img.alt = card.name;
        img.className = 'card-icon ' + card.rarity +' draw-result-icon';
        img.width = 50;
        fragment.appendChild(img);
    });
    drawResultDiv.appendChild(fragment);
}

// 显示卡池卡牌信息
function displayCardPoolInfo() {
    const cardPoolTableBody = document.getElementById('cardPoolTable').getElementsByTagName('tbody')[0];
    cardPoolTableBody.innerHTML = '';
    const fragment = document.createDocumentFragment();
    window.cards.forEach(card => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${card.rarity}</td>
            <td>${card.name}</td>
            <td>${card.description}</td>
            <td>${card.probability}</td>
            <td>${card.value}</td>
        `;
        fragment.appendChild(row);
    });
    cardPoolTableBody.appendChild(fragment);
}

// 切换显示的页面区域
function toggleSection(sectionId) {
    const sections = ['cardPoolInfo', 'backpackInfo', 'historyInfo'];
    sections.forEach(id => {
        const element = document.getElementById(id);
        if (id === sectionId) {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    });
}

// 查看背包函数
function updateBackpackDisplay() {
    const backpackList = document.getElementById('backpackList');
    backpackList.innerHTML = '';
    if (backpack.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = '你的背包中没有任何卡牌哦~';
        backpackList.appendChild(emptyMessage);
        return;
    }
    // 对背包中的卡牌进行堆叠和排序操作
    const stackedBackpack = stackAndSortBackpack(backpack);
    const fragment = document.createDocumentFragment();
    stackedBackpack.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <img src="${item.card.image}" alt="${item.card.name}" class="card-icon ${item.card.rarity} backpack-icon" width="50"> 
            <span>${item.card.name}</span>
            <button onclick="viewCardDetails('${item.card.name}')">查看详情</button>
            <button onclick="sellCard('${item.card.name}', 1)">出售</button>
        `;
        fragment.appendChild(listItem);
    });
    backpackList.appendChild(fragment);
}

// 对背包中的卡牌进行堆叠和排序操作
function stackAndSortBackpack(backpack) {
    // 先对相同的卡牌进行堆叠
    const stackedBackpack = stackCards(backpack);
    // 再对堆叠后的卡牌按稀有度排序
    return sortBackpackByRarity(stackedBackpack);
}

// 对相同的卡牌进行堆叠
function stackCards(backpack) {
    return backpack.reduce((acc, curr) => {
        const found = acc.find(item => item.card.name === curr.card.name);
        if (found) {
            found.count++;
        } else {
            acc.push({ card: curr.card, count: 1 });
        }
        return acc;
    }, []);
}

// 对背包中的卡牌按稀有度排序
function sortBackpackByRarity(backpack) {
    const rarityOrder = new Map([
        [RARITIES.SSR, 4],
        [RARITIES.SR, 3],
        [RARITIES.R, 2],
        [RARITIES.N, 1]
    ]);
    return backpack.slice().sort((a, b) => {
        if (rarityOrder.get(a.card.rarity) === rarityOrder.get(b.card.rarity)) {
            return a.card.name.localeCompare(b.card.name);
        }
        return rarityOrder.get(b.card.rarity) - rarityOrder.get(a.card.rarity);
    });
}

// 查看卡牌详情函数
function viewCardDetails(cardName) {
    const card = window.cards.find(c => c.name === cardName);
    const cardItem = backpack.find(item => item.card.name === cardName);
    const cardCount = cardItem? cardItem.count : 0;
    const cardDetailsDiv = document.createElement('div');
    cardDetailsDiv.className = 'cardDetails';
    cardDetailsDiv.innerHTML = `
        <h3>卡牌详情</h3>
        <img src="${card.image}" alt="${card.name}" width="100">
        <p>名称: ${card.name}</p>
        <p>稀有等级: ${card.rarity}</p>
        <p>描述: ${card.description}</p>
        <p>概率: ${card.probability}</p>
        <p>价值: ${card.value}</p>
        <p>数量: ${cardCount}</p> 
        <div style="display: flex; justify-content: center;">
            <button onclick="sellCardFromDetails('${card.name}', 1)">出售</button>
            <button onclick="closeCardDetails(event)">关闭</button>
        </div>
    `;
    document.body.appendChild(cardDetailsDiv);
}

// 关闭卡牌详情
function closeCardDetails(event) {
    if (event) {
        event.stopPropagation();
    }
    const cardDetailsDiv = document.querySelector('.cardDetails');
    if (cardDetailsDiv) {
        cardDetailsDiv.remove();
    }
}

// 出售卡牌函数，可指定数量
function sellCard(cardName, quantity = 1) {
    const index = backpack.findIndex(item => item.card && item.card.name === cardName);
    if (index!== -1) {
        const item = backpack[index];
        if (item.count >= quantity) {
            currency += item.card.value * quantity;
            updateCurrencyDisplay();
            item.count -= quantity;
            if (item.count === 0) {
                backpack = backpack.filter(c => c.card.name!== cardName);
            } else {
                backpack[index] = item;
            }
            updateBackpackDisplay();
            playSellSound(); // 播放出售音效
            showSuccessPopup(`成功出售 ${quantity} 张 ${cardName}，获得 ${item.card.value * quantity} 货币`);
        } else {
            showPopup('警告', `您没有足够的 ${cardName} 卡牌可供出售`);
        }
    } else {
        showPopup('警告', `背包中没有 ${cardName} 卡牌`);
    }
}

// 从详情中出售卡牌，默认出售 1 张
function sellCardFromDetails(cardName, quantity = 1) {
    sellCard(cardName, quantity);
    closeCardDetails(event);
}

// 查看抽卡历史记录函数
function displayHistory() {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = '';
    const fragment = document.createDocumentFragment();
    drawHistory.forEach((draw, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<span>第${index + 1}次抽卡：</span>`;
        const imgFragment = document.createDocumentFragment();
        draw.cards.forEach(card => {
            const img = document.createElement('img');
            img.src = card.image;
            img.alt = card.name;
            img.className = 'card-icon ' + card.rarity;
            img.width = 50;
            imgFragment.appendChild(img);
        });
        listItem.appendChild(imgFragment);
        fragment.appendChild(listItem);
    });
    historyList.appendChild(fragment);
}

// 清除数据函数
function clearData() {
    currency = 1000;
    backpack = [];
    drawHistory = [];
    updateCurrencyDisplay();
    updateBackpackDisplay();
    displayHistory();
    saveGameData();
}

// 保存游戏数据到本地存储
function saveGameData() {
    const gameData = {
        currency: currency,
        backpack: backpack.map(item => ({ card: item.card, count: item.count })),
        drawHistory: drawHistory.map(record => ({ cards: record.cards }))
    };
    localStorage.setItem('gameData', JSON.stringify(gameData));
}

// 从本地存储加载游戏数据
function loadGameData() {
    const storedData = localStorage.getItem('gameData');
    if (storedData) {
        const gameData = JSON.parse(storedData);
        currency = gameData.currency;
        backpack = gameData.backpack.map(item => ({ card: new Card(item.card.name, item.card.rarity, item.card.description, item.card.probability, item.card.value, item.card.image), count: item.count }));
        drawHistory = gameData.drawHistory.map(record => new DrawRecord(record.cards.map(card => new Card(card.name, card.rarity, card.description, card.probability, card.value, card.image))));
    }
    // 加载完数据后更新显示
    updateCurrencyDisplay();
    updateBackpackDisplay();
    displayHistory();
}

// 播放抽卡音效
function playDrawSound() {
    const drawSound = document.getElementById('drawSound');
    drawSound.play();
}

// 播放出售音效
function playSellSound() {
    const sellSound = document.getElementById('sellSound');
    sellSound.play();
}

// 显示弹窗
function showPopup(title, message) {
    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.innerHTML = `
        <div class="popup-content">
            <h3>${title}</h3>
            <p>${message}</p>
            <button onclick="closePopup(this.parentNode.parentNode)">关闭</button>
        </div>
    `;
    const mask = document.createElement('div');
    mask.className = 'popup-mask';
    mask.appendChild(popup);
    document.body.appendChild(mask);
}

// 关闭弹窗
function closePopup(popup) {
    popup.parentNode.remove();
}

// 显示成功弹窗
function showSuccessPopup(message) {
    showPopup('成功', message);
}