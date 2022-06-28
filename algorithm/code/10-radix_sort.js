function swap(arr, i, j) {
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

function maxbits(max) {
  // 计算一个数字有几位
  let k = 0
  while (max > 0) {
    max = Math.floor(max / 10)
    k++
  }
  return k
}
/**
 * 因为堆是完全二叉树， 所以必然有Math.floor((size + 1) / 2) 个叶子节点， 所以只需确保Math.floor(size / 2) 的位置正确， 即只对前Math.floor(size) 个元素进行heapify, 就可以完成堆化。 这样节省了操作， 提高了一半效率。
 *
 * @param {*} arr
 * @param {*} left
 * @param {*} right
 */
function radix_sort(arr, left, right) {
  if (arr == null || arr.length < 2) return
  left = left || 0
  right = right || arr.length - 1

  let max = Math.abs(arr[left])
  for (let i = left + 1; i <= right; i++) {
    max = Math.max(max, Math.abs(arr[i]))
  }
  for (let i = 0; i <= right; i++) {
    arr[i] += max
  }

  radixSort(arr, left, right, maxbits(2 * max))
  for (let i = 0; i <= right; i++) {
    arr[i] -= max
  }
}

function getDigit(value, digit) {
  // 获取一个数字特定位置的值
  let target = 0
  while (digit > 0) {
    target = value % 10
    value = Math.floor(value / 10)
    digit--
  }
  return target
}

function radixSort(arr, begin, end, digit) {
  // 从个位排到digit位,1代表个位
  let j = 0 // 表示arr数组元素在当前位的值（被用作count的索引）
  let i = 0 // 遍历数组arr的索引
  let radix = 10
  const bucket = new Array(end - begin + 1)
  for (let d = 1; d <= digit; d++) {
    // 用count数组的索引表示arr元素当前位(digit)的值，count数组索引对应的值表示arr数组当前位的值的出现次数；并构成前缀和数组
    const count = new Array(radix).fil
    l(0)

    for (i = begin; i <= end; i++) {
      j = getDigit(arr[i], d)
      count[j]++
    }

    // 构建前缀和数组
    for (j = 1; j < radix; j++) {
      count[j] += count[j - 1]
    }

    // 按照d位从后往前排序
    for (i = end; i >= begin; i--) {
      j = getDigit(arr[i], d)
      bucket[--count[j]] = arr[i]
    }

    for (i = begin; i <= end; i++) {
      arr[i] = bucket[i - begin]
    }
  }
}


// 测试的方法
function testMethod(arr) {
  radix_sort(arr)
}

//正确的方法
function rightMethod(arr) {
  arr.sort((a, b) => a - b);
}

//随机数组生成器，size为最大长度，value为最大值
function generateRandomArray(size, value) {
  //生成长度随机的数组
  let arr = new Array(Math.floor((size + 1) * Math.random()));
  for (let i = 0; i < arr.length; i++) {
    arr[i] = Math.floor((value + 1) * ((Math.random() - 0.5) * 2));
  }
  return arr;
}

//拷贝数组方法
function copyArray(arr) {
  if (arr == null) {
    return null;
  }
  return [].concat(arr);
}

//比对方法
function isEqual(arr1, arr2) {
  if ((arr1 == null && arr2 != null) || (arr1 != null && arr2 == null)) {
    return false;
  }
  if (arr1 == null && arr2 == null) {
    return true;
  }
  if (arr1.length != arr2.length) {
    return false;
  }
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] != arr2[i]) {
      return false;
    }
  }
  return true;
}

//测试
function Test() {
  let testTimes = 5000;
  let size = 10;
  let value = 100;
  let succeed = true;
  for (let i = 0; i < testTimes; i++) {
    let arr1 = generateRandomArray(size, value);
    let arr2 = copyArray(arr1);
    let arr3 = copyArray(arr1);
    testMethod(arr1);
    rightMethod(arr2);
    if (!isEqual(arr1, arr2)) {
      succeed = false;
      console.log(arr3);
      break;
    }
  }
  console.log(succeed ? 'nice' : 'Fucking fucked');
}

Test();