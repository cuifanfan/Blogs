function swap(arr, i, j) {
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

// 不涉及比较的排序，都只适用于特定场景。比如计数只适用于小而密集的数据(比如统计员工年龄)
function count_sort(arr, left, right) {
  if (arr === null || arr.length < 2) return

  left = left || 0
  right = right || arr.length - 1

  // 用索引计数会出现负数的情况，可以用把绝对值最大的数和数组元素求和，排完序再减掉。
  let max = Math.abs(arr[left])
  for (let i = left + 1; i <= right; i++) {
    max = Math.max(max, Math.abs(arr[i]))
  }

  for (let i = left; i <= right; i++) {
    arr[i] += max
  }

  const help = new Array(2 * max + 1).fill(0)
  for (let i = left; i <= right; i++) {
    help[arr[i]]++
  }

  let k = 0
  for (let i = 0; i < help.length; i++) {
    while (help[i]-- > 0) arr[k++] = i
  }

  // 减去max
  for (let i = left; i <= right; i++) {
    arr[i] -= max
  }
}



// 测试的方法

function testMethod(arr) {
  count_sort(arr)
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