//#region #485. Max Consecutive Ones
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaxConsecutiveOnes = function (nums) {
    let max = 0, count = 0;
    nums.forEach(n => {
        if (n === 1) count++;
        else {
            if (count > max) max = count;
            count = 0;
        }
    })
    return max > count ? max : count;
};
var findMaxConsecutiveOnes = function (nums) {
    let record = Array(nums.length).fill(0);
    record[0] = nums[0];
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] === 1) record[i] = record[i - 1] + 1;
    }
    return Math.max(...record);
};
//#endregion

//#region #1295. Find Numbers with Even Number of Digits
var findNumbers = function (nums) {
    let result = 0;
    nums.forEach(n => {
        let count = 1;
        while (n >= 10) {
            n = n / 10;
            count++;
        }
        if (count % 2 === 0) result++;
    })
    return result;
};
var findNumbers = function (nums) {
    let result = 0;
    nums.forEach(n => {
        if (n.toString().length % 2 === 0) result++;
    })
    return result;
};
//#endregion

//#region #977. Squares of a Sorted Array
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function (nums) {
    return nums.map(n => n * n).sort((a, b) => a - b);
};
var sortedSquares = function (nums) {
    let len = nums.length, left = 0, right = len - 1, result = Array(len);

    for (let i = len - 1; i >= 0; i--) {
        let leftNum = nums[left] ** 2;
        let rightNum = nums[right] ** 2;
        if (leftNum > rightNum) {
            result[i] = leftNum;
            left++;
        }
        else if (rightNum > leftNum) {
            result[i] = rightNum;
            right--;
        } else {
            result[i--] = leftNum;
            if (i < 0) break;
            result[i] = rightNum;
            left++;
            right--;
        }
    }
    return result;
};
//#endregion

//#region #1089. Duplicate Zeros
/**
 * @param {number[]} arr
 * @return {void} Do not return anything, modify arr in-place instead.
 */
var duplicateZeros = function (arr) {
    let len = arr.length;
    let record = arr.reduce((r, num, i) => {
        if (num === 0) r.push(i);
        return r;
    }, []);
    for (let i = record.length - 1; i >= 0; i--) {
        arr.splice(record[i], 0, 0);
    }
    arr.length = len;
};
var duplicateZeros = function (arr) {
    let len = arr.length;
    for (let i = 0; i < len; i++) {
        if (arr[i] === 0) arr.splice(i++, 0, 0);
    }
    arr.length = len;
};
//#endregion

//#region #88. Merge Sorted Array
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function (nums1, m, nums2, n) {
    for (let i = m, j = 0; i < m + n; i++, j++) {
        nums1[i] = nums2[j];
    }
    return nums1.sort((a, b) => a - b);
};
var merge = function (nums1, m, nums2, n) {
    for (let i = nums1.length - 1; i >= 0; i--) {
        if (n === 0) break;
        let num1 = nums1[m - 1], num2 = nums2[n - 1];
        if (num1 > num2) {
            nums1[i] = num1;
            m--
        } else {
            nums1[i] = num2;
            n--;
        }
    }
    return nums1;
};
//#endregion

//#region #27. Remove Element
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function (nums, val) {
    let index = nums.indexOf(val);
    while (index > -1) {
        nums.splice(index, 1);
        index = nums.indexOf(val);
    }
    return nums.length;
};
var removeElement = function (nums, val) {
    let len = nums.length, left = 0, right = len - 1;
    if (len === 1) len = nums[0] === val ? 0 : len;
    while (left < right) {
        if (nums[left] === val) {
            while (nums[right] === val && right > left) {
                right--;
                len--;
            }
            [nums[left], nums[right]] = [nums[right], nums[left]];
            right--;
            len--;
        }
        left++;
    }
    nums.length = len;
    return len;
};
//#endregion

//#region #26. Remove Duplicates from Sorted Array
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
    for (let i = 0; i < nums.length; i++) {
        let lastIndex = nums.lastIndexOf(nums[i]);
        nums.splice(i, lastIndex - i);
    }
    return nums.length;
};
var removeDuplicates = function (nums) {
    for (let i = 0; i < nums.length; i++) {
        let count = 0;
        while (nums[i + count + 1] === nums[i]) count++;
        nums.splice(i + 1, count);
    }
    return nums.length;
};
var removeDuplicates = function (nums) {
    let index = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[index] !== nums[i]) nums[++index] = nums[i];
    }
    return index + 1;
};
//#endregion

//#region #1346. Check If N and Its Double Exist
/**
 * @param {number[]} arr
 * @return {boolean}
 */
 var checkIfExist = function(arr) {
    let hashSet = new Set();
    for (let i = 0; i < arr.length; i++) {
        let num = arr[i];
        if(hashSet.has(num))return true;
        hashSet.add(num * 2);
        if (num % 2 === 0) hashSet.add(num / 2);
    }
    return false;
};
//#endregion

//#region #941. Valid Mountain Array
/**
 * @param {number[]} arr
 * @return {boolean}
 */
var validMountainArray = function (arr) {
    if (arr.length === 1 || arr[0] > arr[1]) return false;
    let trigger = false;
    for (let i = 1; i < arr.length; i++) {
        let prev = arr[i - 1], curr = arr[i];
        if (curr === prev) return false;
        if (!trigger) {
            if (curr < prev) trigger = true;
        } else {
            if (curr > prev) return false;
        }
    }
    return trigger;
};
//#endregion

//#region #1299. Replace Elements with Greatest Element on Right Side
/**
 * @param {number[]} arr
 * @return {number[]}
 */
var replaceElements = function (arr) {
    let len = arr.length, max = -1;
    while (--len >= 0) {
        let temp = arr[len];
        arr[len] = max;
        if (temp > max) max = temp;
    }
    return arr;
};
//#endregion

//#region #283. Move Zeroes
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
 var moveZeroes = function (nums) {
    let zeros_index = [];
    for (let i = 0; i < nums.length; i++) {
        let num = nums[i];
        if (num !== 0 && i > zeros_index[0]) {
            let zero_i = zeros_index.shift();
            nums[zero_i] = nums[i];
            nums[i] = 0;
            zeros_index.push(i);
        } else if (num === 0) zeros_index.push(i);
    }
};
//#endregion

//#region #905. Sort Array By Parity
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArrayByParity = function (nums) {
    let len = nums.length, left = 0, right = len - 1;
    while (left < right) {
        if (nums[left] % 2 === 1) {
            while (nums[right] % 2 === 1) right--;
            if (right < left) break;
            [nums[left], nums[right]] = [nums[right], nums[left]];
        }
        left++;
    }
    return nums;
};
//#endregion

//#region #1051. Height Checker
/**
 * @param {number[]} heights
 * @return {number}
 */
var heightChecker = function (heights) {
    const correct_h = heights.slice().sort((a, b) => a - b);
    let count = 0;
    correct_h.forEach((h, i) => {
        if (h !== heights[i]) count++;
    })
    return count;
};
//#endregion

//#region #414. Third Maximum Number
/**
 * @param {number[]} nums
 * @return {number}
 */
var thirdMax = function (nums) {
    const distinct_nums = Array.from(new Set(nums));
    distinct_nums.sort((a, b) => b - a);
    return distinct_nums.length > 2 ? distinct_nums[2] : distinct_nums[0];
};
var thirdMax = function (nums) {
    const distinct_nums = new Set(nums), len = distinct_nums.size;
    let max_1 = Math.max(...distinct_nums);
    if (len > 2) {
        distinct_nums.delete(max_1);
        max_1 = Math.max(...distinct_nums);
        distinct_nums.delete(max_1);
        max_1 = Math.max(...distinct_nums);
    }
    return max_1
};
//#endregion

//#region #448. Find All Numbers Disappeared in an Array
/**
 * @param {number[]} nums
 * @return {number[]}
 */
 var findDisappearedNumbers = function (nums) {
    const res = [];
    for (let i = 0; i < nums.length; i++) {
        const idx = Math.abs(nums[i]) - 1;
        nums[idx] = Math.abs(nums[idx]) * -1;
    }

    for (let i = 0; i < nums.length; i++) {
        if (nums[i] > 0) res.push(i + 1);
    }
    return res;
};
var findDisappearedNumbers4 = function (nums) {
    let all_nums = new Set();
    for (let i = 1; i <= nums.length; i++) {
        all_nums.add(i);
    }
    nums.forEach(num => all_nums.delete(num));
    return [...all_nums];
};
var findDisappearedNumbers3 = function (nums) {
    let all_nums = Array(nums.length + 1).fill(0), result = [];
    all_nums[0] = 1;
    nums.forEach(num => all_nums[num]++);
    all_nums.forEach((num, i) => {
        if (num === 0) result.push(i);
    });
    return result;
};
var findDisappearedNumbers2 = function (nums) {
    let set = new Set(nums), len = nums.length, result = [];
    nums = Array.from(set).sort((a, b) => a - b);
    for (let i = 0, j = 0; i < len; i++) {
        let curr = i + 1;
        if (curr === nums[j]) j++;
        else result.push(curr);
    }
    return result;
};
//#endregion


