function swap(arr, i, j) {
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

// 构建最大堆
function heap_sort(arr, left, right) {
  if (arr === null || left >= right) return

  left = left || 0
  right = right || arr.length - 1

  // 把[left,right]上的元素堆化
  // for (let i = left; i <= right; i++) {
  //   heap_insert(arr, i, left)
  // }

  // 因为堆是完全二叉树，所以必然有Math.floor((size+1)/2)个叶子节点，所以只需确保Math.floor(size/2)的位置正确，即只对前Math.floor(size)个元素进行heapify,就可以完成堆化。

  for (let i = Math.floor((right - left) / 2); i >= left; i--) {
    heapify(arr, i, right)
  }

  // 把最后的元素和堆顶交换，然后缩小堆
  let size = right
  while (size >= left) {
    swap(arr, left, size)
    heapify(arr, left, --size)
  }
}

// 当前元素处于index,向上调整堆结构
function heap_insert(arr, index, root) {
  // root表示根所在的索引，pIndex表示父元素的索引
  let pIndex = Math.floor((index - 1) / 2)
  while (pIndex >= root) {
    if (arr[pIndex] >= arr[index]) break

    swap(arr, pIndex, index)
    index = pIndex
    pIndex = Math.floor((index - 1) / 2)
  }
}


// 当前元素处于index,向下调整堆结构,size表示数组堆结构
function heapify(arr, index, size) {
  let left = 2 * index + 1

  while (left <= size) {
    // 表示还有孩子,取孩子中最大值的索引
    let maxIndex = left + 1 <= size && arr[left] < arr[left + 1] ? left + 1 : left

    if (arr[index] >= arr[maxIndex]) return

    swap(arr, maxIndex, index)
    index = maxIndex
    left = 2 * index + 1
  }
}

// 测试的方法
function testMethod(arr) {
  heap_sort(arr)
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