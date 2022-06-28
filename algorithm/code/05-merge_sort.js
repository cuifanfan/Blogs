function swap(arr, i, j) {
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

function merge(arr, left, middle, right) {
  const result = []

  let i = left
  let j = middle + 1
  while (true) {
    if (i === middle + 1) {
      while (j <= right) result.push(arr[j++])
      break
    }

    if (j === right + 1) {
      while (i <= middle) result.push(arr[i++])
      break
    }
    if (arr[i] <= arr[j]) result.push(arr[i++])
    else result.push(arr[j++])
  }

  for (let i = left; i <= right; i++) {
    arr[i] = result[i - left]
  }
}



function merge_sort(arr, left, right) {
  if (arr === null || left >= right) return

  left = left || 0
  right = right || arr.length - 1

  // 这么做的目的是为了防止(left+right)超出边界
  const middle = Math.floor(left + ((right - left) >> 1))
  merge_sort(arr, left, middle)
  merge_sort(arr, middle + 1, right)
  merge(arr, left, middle, right)
}



// 测试的方法
function testMethod(arr) {
  merge_sort(arr)
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