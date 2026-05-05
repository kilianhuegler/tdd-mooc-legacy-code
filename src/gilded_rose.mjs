export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    for (const item of this.items) {
      switch (item.name) {
        case "Aged Brie":
          updateAgedBrie(item);
          break;
        case "Sulfuras, Hand of Ragnaros":
          updateSulfuras(item);
          break;
        case "Backstage passes to a TAFKAL80ETC concert":
          updateBackstagePasses(item);
          break;
        default:
          updateNormal(item);
          break;
      }
    }

    return this.items;
  }
}

function increaseQuality(item) {
  if (item.quality < 50) item.quality++;
}

function decreaseQuality(item) {
  if (item.quality > 0) item.quality--;
}

function updateAgedBrie(item) {
  increaseQuality(item);
  item.sellIn--;
  if (item.sellIn < 0) increaseQuality(item);
}

function updateSulfuras(item) {}

function updateBackstagePasses(item) {
  increaseQuality(item);
  if (item.sellIn < 11) increaseQuality(item);
  if (item.sellIn < 6) increaseQuality(item);
  item.sellIn--;
  if (item.sellIn < 0) {
    item.quality = 0;
  }
}

function updateNormal(item) {
  decreaseQuality(item);
  item.sellIn--;
  if (item.sellIn < 0) decreaseQuality(item);
}
