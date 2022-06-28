function swap(arr, i, j) {
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

function quick_sort(arr, left, right) {
  if (arr === null || arr.length < 2 || left >= right) return

  left = left || 0
  right = right || arr.length - 1

  // 随机选取枢纽[left, right],然后和right交换
  swap(arr, right, left + Math.floor((right - left + 1) * Math.random()))

  // 根据枢纽把数组分为：[0,section[0]-1]小于枢纽，[section[0],section[1]]等于枢纽，[section[1]+1,right]大于枢纽
  const section = partation(arr, left, right)
  quick_sort(arr, left, section[0] - 1)
  quick_sort(arr, section[1] + 1, right)
}

function partation(arr, left, right) {
  let i = left - 1
  let j = right
  let k = left

  // [left, i]: 小于privot范围
  // [j, right]: 大于privot范围
  // [i+1,j-1]:等于privot范围
  while (k < j) {
    if (arr[k] > arr[right]) {
      swap(arr, --j, k)
    } else if (arr[k] < arr[right]) {
      swap(arr, ++i, k++)
    } else {
      k++
    }
  }
  swap(arr, right, j)
  return [i + 1, j]
}


// 测试的方法
function testMethod(arr) {
  quick_sort(arr)
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