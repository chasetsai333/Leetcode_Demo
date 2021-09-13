/********** Array **********/
//#region 26. Remove Duplicates from Sorted Array

const { func } = require("prop-types");

/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates1 = function (nums) {
    for (let i = 0; i < nums.length; i++) {
        let count = 0;
        while (nums[i + count + 1] === nums[i]) {
            count++;
        }
        nums.splice(i + 1, count);
    }
    return nums.length;
};
var removeDuplicates2 = function (nums) {
    for (let i = 0; i < nums.length; i++) {
        let lastIndex = nums.lastIndexOf(nums[i]);
        nums.splice(i, lastIndex - i);
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

//#region 122. Best Time to Buy and Sell Stock II
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
    let total = 0;
    if (prices.length > 1) {
        for (let i = 0; i < prices.length; i++) {
            let prev = prices[i], curr = prices[i + 1];
            if (prev < curr) total += curr - prev;
        }
    }
    return total;
};
//#endregion

//#region 189. Rotate Array
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function (nums, k) { // [1,2,3,4,5,6,7], 3
    let len = nums.length;
    k = k % len;

    nums.reverse(); // [7,6,5,4,3,2,1]
    reverse(nums, 0, k - 1); // [5,6,7,4,3,2,1]
    reverse(nums, k, len - 1); // [5,6,7,1,2,3,4]

    function reverse(nums, start, end) {
        while (start < end) {
            let temp = nums[start];
            nums[start] = nums[end];
            nums[end] = temp;
            start++;
            end--;
        }
    }
};
var rotate = function (nums, k) {
    let len = nums.length;
    if (k !== len) {
        k = k > len ? k % len : k;
        let start = len - k;
        nums.unshift(...nums.slice(start));
        nums.length = len;
    }
};
var rotate = function (nums, k) {
    if (k === 0) return nums;
    const len = nums.length;
    k = k % len;
    const start = len - k;
    const cut = nums.splice(start);
    nums.unshift(...cut);
};
//#endregion

//#region 217. Contains Duplicate
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function (nums) {
    let record = new Set();
    return nums.some(n => {
        if (record.has(n)) return true;
        else record.add(n);
    });
};
var containsDuplicate = function (nums) {
    return new Set(nums).size !== nums.length;
};
//#endregion

//#region 136. Single Number
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums) {
    let sortArr = nums.sort((a, b) => a - b);
    for (let i = 0; i < sortArr.length; i++) {
        if (sortArr[i] !== sortArr[++i]) return sortArr[i - 1];
    }
};
var singleNumber = function (nums) {
    return nums.reduce((prev, curr) => prev ^= curr, 0)
};
//#endregion

//#region 350. Intersection of Two Arrays II
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function (nums1, nums2) {
    nums1.sort((a, b) => a - b);
    nums2.sort((a, b) => a - b);
    const result = [];
    let index1 = nums1.length - 1, index2 = nums2.length - 1;
    while (index1 > -1 && index2 > -1) {
        const num1 = nums1[index1], num2 = nums2[index2];
        if (num1 === num2) {
            result.push(num1);
            index1--; index2--;
        }
        else if (num1 > num2) index1--;
        else if (num2 > num1) index2--;
    }
    return result;
};
var intersect = function (nums1, nums2) {
    let mapper = new Map();
    nums1.forEach(n1 => mapper.set(n1, mapper.has(n1) ? mapper.get(n1) + 1 : 1));
    return nums2.reduce((res, n2) => {
        if (mapper.has(n2)) {
            let count = mapper.get(n2) - 1;
            if (count > 0) mapper.set(n2, count);
            else mapper.delete(n2)
            res.push(n2);
        }
        return res;
    }, [])
};
//#endregion

//#region 66. Plus One
/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function (digits) {
    const digit = BigInt(digits.join('')) + BigInt(1);
    return Array.from(digit.toString());
};
var plusOne = function (digits) {
    for (let i = digits.length - 1; i >= 0; i--) {
        let sum = digits[i] + 1;
        if (sum === 10) {
            digits[i] = 0;
            if (i === 0) digits.unshift(1);
        }
        else {
            digits[i] = sum;
            break;
        }
    }
    return digits;
};
//#endregion

//#region 283. Move Zeroes
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

//#region 1. Two Sum
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
    let mapper = new Map([[nums[0], 0]]);
    for (let i = 1; i < nums.length; i++) {
        let num = nums[i];
        if (mapper.has(target - num)) return [mapper.get(target - num), i];
        else mapper.set(num, i);
    }
};
var twoSum = function (nums, target) {
    let result = [];
    let numLen = nums.length;
    nums.some((num_1, i, self) => {
        for (let j = (i + 1); j < numLen; j++) {
            const num_2 = self[j];
            if ((num_1 + num_2) === target) {
                result = [i, j];
                return true;
            }
        }
        if (result.length > 0)
            return true;
    })
    return result;
};
//#endregion

//#region 36. Valid Sudoku
/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function (board) {
    const checkRowColumn = (board) => {
        for (let i = 0; i < 9; i++) {
            const row_record = new Set(), column_record = new Set();
            for (let j = 0; j < 9; j++) {
                const row_num = board[i][j], column_num = board[j][i];
                if (row_num !== '.') {
                    if (row_record.has(row_num)) return false;
                    row_record.add(row_num);
                }
                if (column_num !== '.') {
                    if (column_record.has(column_num)) return false;
                    column_record.add(column_num);
                }
            }
        }
        return true;
    }
    const checkSquare = (board) => {
        for (let multiple = 1; multiple < 4; multiple++) {
            let start = 3 * (multiple - 1), end = 3 * multiple;
            const record1 = new Set(), record2 = new Set(), record3 = new Set();
            for (let i = 0; i < 3; i++) {
                for (let j = start; j < end; j++) {
                    const num1 = board[i][j], num2 = board[i + 3][j], num3 = board[i + 6][j];
                    if (num1 !== '.') {
                        if (record1.has(num1)) return false;
                        record1.add(num1);
                    }
                    if (num2 !== '.') {
                        if (record2.has(num2)) return false;
                        record2.add(num2);
                    }
                    if (num3 !== '.') {
                        if (record3.has(num3)) return false;
                        record3.add(num3);
                    }
                }
            }
        }
        return true;
    }
    return checkRowColumn(board) && checkSquare(board);
};
//#endregion

//#region 48. Rotate Image
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function (matrix) {
    let n = matrix.length;
    for (let i = 0; i < n / 2; i++) {
        for (let j = i; j < n - 1 - i; j++) {
            let tmp = matrix[i][j];
            matrix[i][j] = matrix[n - 1 - j][i];
            matrix[n - 1 - j][i] = matrix[n - 1 - i][n - 1 - j];
            matrix[n - 1 - i][n - 1 - j] = matrix[j][n - 1 - i];
            matrix[j][n - 1 - i] = tmp;
        }
    }
};
//#endregion

/********** String **********/
//#region 344. Reverse String
/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function (s) {
    return s.reverse();
};
var reverseString = function (s) {
    let left = 0, right = s.length - 1;
    while (left < right) {
        [s[left], s[right]] = [s[right], s[left]];
        left++; right--;
    }
};
//#endregion

//#region 7. Reverse Integer
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
    let num = Math.abs(x), max = Math.pow(2, 31), min = -max, result = 0;
    while (num >= 1) {
        result = result * 10 + num % 10;
        num = Math.floor(num / 10);
    }
    if (x < 0) {
        result = -result < min ? 0 : -result;
    } else {
        result = result > max - 1 ? 0 : result;
    }
    return result;
};
//#endregion

//#region 387. First Unique Character in a String
/**
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function (s) {
    let record = new Set();
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        if (record.has(char)) continue;
        if (s.lastIndexOf(char) !== i) record.add(char);
        else return i;
    }
    return -1;
};
//#endregion

//#region 242. Valid Anagram
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
    if (s.length !== t.length) return false;
    const record = new Map();
    for (let i = 0; i < s.length; i++) {
        char_s = s[i];
        char_t = t[i];
        if (char_s !== char_t) {
            record.set(char_s, record.has(char_s) ? record.get(char_s) + 1 : 1);
            record.set(char_t, record.has(char_t) ? record.get(char_t) - 1 : -1);
        }
    }
    for (const [key, value] of record) {
        if (value !== 0) return false;
    }
    return true;
};
var isAnagram = function (s, t) {
    if (s.length !== t.length) return false;
    const record = new Map();
    for (let i = 0; i < s.length; i++) {
        const char_s = s[i];
        record.set(char_s, record.has(char_s) ? record.get(char_s) + 1 : 1);
    }
    for (let i = 0; i < s.length; i++) {
        const char_t = t[i];
        let count = record.get(char_t);
        if (count === undefined || count === 0) return false;
        record.set(char_t, count - 1);
    }
    return true;
};
//#endregion

//#region 125. Valid Palindrome
/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
    s = s.trim().replace(/[^a-zA-Z]/g, "").toLowerCase();
    let left = 0, right = s.length - 1;
    while (left < right) {
        if (s[left++] !== s[right--]) return false;
    }
    return true;
};
//#endregion

//#region 8. String to Integer (atoi)
/**
 * @param {string} s
 * @return {number}
 */
var myAtoi = function (s) {
    const match_num = s.trim().match(/^(\+{0,1}||-{0,1})\d+/);
    if (match_num === null) return 0;
    const max = 2147483647, min = -2147483648;
    let result = parseInt(match_num);
    if (result < min) return min;
    if (result > max) return max;
    return result
};
//#endregion

//#region 28. Implement strStr()
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function (haystack, needle) {
    return haystack.indexOf(needle);
};
var strStr = function (haystack, needle) {
    if (needle === "") return 0;
    const len_h = haystack.length, len_n = needle.length;
    for (let i = 0; i <= len_h - len_n; i++) {
        if (haystack[i] === needle[0]) {
            let j = 1;
            for (; j < len_n; j++) {
                if (haystack[i + j] !== needle[j]) break;
            }
            if (j === len_n) return i;
        }
    }
    return -1;
};
//#endregion

//#region 38. Count and Say
/**
 * @param {number} n
 * @return {string}
 */
var countAndSay = function (n) {
    let result = '1';
    for (let i = 1; i < n; i++) result = helper(result);
    return result;

    function helper(num_string) {
        let result = '', count = 1;
        for (let i = 0; i < num_string.length; i++) {
            if (num_string[i] === num_string[i + 1]) count++;
            else {
                result += `${count}${num_string[i]}`
                count = 1;
            }
        }
        return result;
    }
};
//#endregion

//#region 14. Longest Common Prefix
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
    if (strs == null || strs.length == 0) return "";
    let pre = strs[0], i = 1;
    while (i < strs.length) {
        while (strs[i].indexOf(pre) != 0)
            pre = pre.substring(0, pre.length - 1);
        i++;
    }
    return pre;
};
var longestCommonPrefix = function (strs) {
    const len = strs.length;
    if (len === 0) return '';
    if (len === 1) return strs[0];
    let result = '';

    strs.sort();
    const first = strs[0];
    const last = strs[len - 1];

    let min_len = Math.min(first.length, last.length);

    for (let i = 0; i < min_len; i++) {
        if (first[i] !== last[i]) return result;
        result += first[i];
    }
    return result;
};
//#endregion

/********** Linked List **********/
/** Definition
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
//#region 237. Delete Node in a Linked List
/**
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
 */
var deleteNode = function (node) {
    helper(node);
    function helper(node) {
        if (node === null) return { val: null, isTail: true };;
        const oldVal = node.val;
        const { val, isTail } = helper(node.next);
        node.val = val;
        if (isTail) node.next = null;
        return { val: oldVal, isTail: node.val === null };
    }
};
var deleteNode = function (node) {
    while (true) {
        node.val = node.next.val;
        if (node.next.next === null) {
            node.next = null;
            break;
        }
        node = node.next;
    }
};
var deleteNode = function (node) {
    node.val = node.next.val;
    node.next = node.next.next;
};
//#endregion

//#region 19. Remove Nth Node From End of List
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
    const record = Array();
    let curr = head;
    while (curr) {
        record.push(curr);
        curr = curr.next;
    }
    const len = record.length;
    if (len === 1) return null;
    const prev_node = record[len - n - 1] || null;
    const next_node = record[len - n + 1] || null;
    if (prev_node === null) return next_node;
    prev_node.next = next_node;
    return head;
}
//#endregion

//#region 206. Reverse Linked List
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
    if (!head) return head;
    let curr = head, prev_node = null;
    while (curr) {
        prev_node = new ListNode(curr.val, prev_node);
        curr = curr.next;
    }
    return prev_node;
};
//#endregion

//#region 21. Merge Two Sorted Lists
var mergeTwoLists = function (l1, l2) {
    if (l1 === null) return l2;
    if (l2 === null) return l1;

    let curr = new ListNode(), record = curr;
    while (l1 !== null && l2 !== null) {
        val1 = l1.val, val2 = l2.val;
        if (val1 < val2) {
            curr.next = l1;
            l1 = l1.next;
        } else {
            curr.next = l2;
            l2 = l2.next;
        }
        curr = curr.next
    }
    if (l1 === null) curr.next = l2;
    else if (l2 === null) curr.next = l1;
    return record.next;
}
//#endregion

//#region 234. Palindrome Linked List
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function (head) {
    let fast = head, slow = head, prev;
    while (fast !== null && fast.next !== null) {
        prev = new ListNode(slow.val, prev);
        fast = fast.next.next;
        slow = slow.next;
    }
    if (fast !== null) slow = slow.next;

    while (slow) {
        if (slow.val !== prev.val) return false;
        slow = slow.next;
        prev = prev.next;
    }
    return true;
}

//Array
var isPalindrome = function (head) {
    let fast = head, slow = head, box = [];
    while (fast !== null && fast.next !== null) {
        box.push(slow.val);
        fast = fast.next.next;
        slow = slow.next;
    }
    if (fast !== null) slow = slow.next;

    while (slow) {
        if (slow.val !== box.pop()) return false;
        slow = slow.next;
    }
    return true;
}

//Number
var isPalindrome = function (head) {
    let len = _getLength(head), median = Math.floor(len / 2), isOdd = (len / 2 !== median), i = 1, curr = head, box = [];
    while (curr) {
        if (i <= median) {
            box.push(curr.val);
        } else if (isOdd && i === (median + 1)) {

        } else {
            if (curr.val !== box.pop()) return false;
        }
        i++;
        curr = curr.next;
    }
    return true;

    function _getLength(list) {
        let curr = list, count = 1;
        while (curr.next) {
            count++;
            curr = curr.next;
        }
        return count;
    }
};
//#endregion

//#region 141. Linked List Cycle
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function (head) {
    if (!head) return false;
    let currPoint = head, nextPonit = head.next;

    while (currPoint !== nextPonit) {
        if (currPoint === null || nextPonit === null || nextPonit.next === null) return false;
        currPoint = currPoint.next;
        nextPonit = nextPonit.next.next;
    }
    return true;
}
var hasCycle = function (head) {
    let memo = new Map(), curr = head;
    while (true) {
        if (!curr) return false;
        if (memo.has(curr.val)) {
            let compare = memo.get(curr.val);
            if (compare.some(c => c === curr)) return true;
            else compare.push(curr);

        } else {
            memo.set(curr.val, [curr]);
        }
        curr = curr.next;
    }
};

//#endregion

/********** Trees **********/
/** Definition
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
//#region 104. Maximum Depth of Binary Tree
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function (root) {
    let maxLevel = 0;
    depthRecursion(root, 0);
    return maxLevel;

    function depthRecursion(root, level) {
        if (root === null) {
            if (level > maxLevel) maxLevel = level;
            return;
        }
        depthRecursion(root.left, level + 1);
        depthRecursion(root.right, level + 1);
    }
};
//#endregion

//#region 98. Validate Binary Search Tree
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function (root) {
    return isValid(root, null, null);

    function isValid(root, min, max) {
        if (root === null) return true;
        if (min !== null && root.val <= min) return false;
        if (max !== null && root.val >= max) return false;

        return isValid(root.left, min, root.val) && isValid(root.right, root.val, max);
    }
};

var isValidBST = function (root) {
    let last = null;
    return isValid(root);

    function isValid(root) {
        if (root === null) return true;
        if (!isValid(root.left)) return false;
        if (last !== null && root.val <= last.val) return false;
        last = root;
        return isValid(root.right);
    }
};
//#endregion

//#region 101. Symmetric Tree
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function (root) {
    let res = [];
    inorder(root, res);
    let len = res.length;
    let median = (len - 1) / 2;
    if (res[median] !== root.val || (root.left && root.right && root.left.val !== root.right.val)) return false;
    for (let i = 0, j = (len - 1); i < median; i++, j--) {
        if (res[i] !== res[j]) return false;
    }
    return true;

    function inorder(root, res) {
        if (root === null) return;
        inorder(root.left, res);
        if (root.right && root.left === null) res.push(null);
        res.push(root.val);
        if (root.left && root.right === null) res.push(null);
        inorder(root.right, res);
    }
};
var isSymmetric = function (root) {
    return helper(root.left, root.right);
    function helper(tl, tr) {
        if (tl === null || tr === null) return tl === null && tr === null;
        if (tl.val !== tr.val) return false;
        return helper(tl.left, tr.right) && helper(tl.right, tr.left)
    }
}
//#endregion

//#region 102. Binary Tree Level Order Traversal
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
    if (root === null) return [];
    let levelObj = {};
    let result = [[root.val]];
    rangeLevel(root, 1);
    Object.values(levelObj).forEach(o => result.push(o));
    return result;

    function rangeLevel(root, level) {
        if (root === null) return;
        let rangeArr = [];
        if (root.left !== null) {
            rangeArr.push(root.left.val);
            rangeLevel(root.left, level + 1);
        }
        if (root.right !== null) {
            rangeArr.push(root.right.val);
            rangeLevel(root.right, level + 1);
        }
        if (rangeArr.length !== 0) {
            let arr = levelObj[level];
            if (arr === undefined) arr = rangeArr;
            else arr = arr.concat(rangeArr);
            levelObj[level] = arr;
        }
    }
}
var levelOrder = function (root) {
    if (root === null) return [];
    let queue = [root], result = [];

    while (queue[0]) {
        let row = [], len = queue.length;
        for (let i = 0; i < len; i++) {
            const curr = queue.shift();
            row.push(curr.val);

            if (curr.left) queue.push(curr.left);
            if (curr.right) queue.push(curr.right);
        }
        result.push(row);
    }
    return result;
};
//#endregion

//#region 108. Convert Sorted Array to Binary Search Tree
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function (nums) {
    return buildNode(nums, 0, nums.length);

    function buildNode(temp, start, end) {
        if (start >= end) return null;
        else {
            var median = Math.floor((start + end) / 2);
            var result = new TreeNode(temp[median]);
            result.left = buildNode(temp, start, median);
            result.right = buildNode(temp, median + 1, end);
            return result;
        }
    }
};

//#endregion

/********** Sorting and Searching **********/
//#region 88. Merge Sorted Array
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function (nums1, m, nums2, n) {
    for (let i = nums1.length - 1; i >= 0; i--) {
        if (n === 0) break;
        if (nums1[m - 1] > nums2[n - 1]) nums1[i] = nums1[--m];
        else nums1[i] = nums2[--n];
    }
    return nums1;
};
//#endregion

//#region 278. First Bad Version
/**
 * Definition for isBadVersion()
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
 */
var solution = function (isBadVersion) {
    /**
     * @param {integer} n Total versions
     * @return {integer} The first bad version
     */
     return function (n) {
        if (n === 1) return 1;
        let start = 1, end = n;
        while (start < end) {
            const median = start + Math.floor((end - start) / 2);
            if (isBadVersion(median)) end = median;
            else start = median + 1;
        }
        return isBadVersion(start) ? start : end;
    };
};
//#endregion

/********** Dynamic Programming **********/
//#region 70. Climbing Stairs
var climbStairs = function (n) {
    let arr = [0, 1];
    for (let i = 0; i < n; i++) {
        Accumulate(arr);
    }
    return arr.pop();

    function Accumulate() {
        let n = arr.length - 1;
        arr.push(arr[n] + arr[n - 1]);
    }
};
//#endregion

//#region 121. Best Time to Buy and Sell Stock
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
    let min = Number.MAX_VALUE, profit = 0;

    for (let i = 0; i < prices.length; i++) {
        if (prices[i] < min) min = prices[i];
        else profit = Math.max(profit, prices[i] - min);
    }
    return profit;
};
//#endregion

//#region 53. Maximum Subarray
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
    let curr = max = nums[0];
    for (let i = 0; i < nums.length - 1; i++) {
        const n = curr + nums[i + 1];
        curr = n > nums[i + 1] ? n : nums[i + 1];
        if (curr > max) max = curr;
    }
    return max;
};
//#endregion

//#region 198. House Robber
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
    const len = nums.length;
    if (len === 1) return nums[0];
    let prev = nums[0], next = max = Math.max(nums[0], nums[1]);

    for (let i = 2; i < len; i++) {
        max = Math.max(next, prev + nums[i]);
        prev = next;
        next = max;
    }
    return max;
};
//#endregion

/********** Design **********/
//#region 384. Shuffle an Array
/**
 * @param {number[]} nums
 */
var Solution = function (nums) {
    this._originals = nums;
    this._shuffles = nums.slice();
};

/**
 * Resets the array to its original configuration and return it.
 * @return {number[]}
 */
Solution.prototype.reset = function () {
    return this._originals;
};

/**
 * Returns a random shuffling of the array.
 * @return {number[]}
 */
Solution.prototype.shuffle = function () {
    for (let i = this._shuffles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this._shuffles[i], this._shuffles[j]] = [this._shuffles[j], this._shuffles[i]];
    }
    return this._shuffles;
};
//#endregion

//#region 155. Min Stack
/**
 * initialize your data structure here.
 */
var MinStack = function () {
    this._stack = [];
    this.len = -1;
};
MinStack.prototype._getTop = function () {
    return this._stack[this.len];
}

/** 
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function (val) {
    let prev = this._getTop();
    this._stack.push({
        val: val,
        min: prev === undefined ? val : prev.min > val ? val : prev.min
    });
    this.len++;
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
    this._stack.pop();
    this.len--;
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
    return this._getTop().val;
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
    return this._getTop().min;
};
//#endregion

/********** Math **********/
//#region 412. Fizz Buzz
/**
 * @param {number} n
 * @return {string[]}
 */
var fizzBuzz = function (n) {
    const result = [];
    for (let i = 1; i <= n; i++) {
        let temp = '';
        if (i % 3 === 0) temp += 'Fizz';
        if (i % 5 === 0) temp += 'Buzz';
        result.push(temp || temp + i);
    }
    return result;
};
var fizzBuzz = function (n) {
    return Array(n).fill('')
        .map((s, i) =>
            s + (((++i % 3 === 0 ? 'Fizz' : '') + (i % 5 === 0 ? 'Buzz' : '')) || i))
};
//#endregion

//#region 204. Count Primes
/**
 * @param {number} n
 * @return {number}
 */
var countPrimes = function (n) {
    if (n < 2) return 0;
    let count = 0;
    for (let i = 2; i < n; i++) {
        if (isPrimeNumber(i)) count++;
    }
    return count;

    function isPrimeNumber(n) {
        if (n === 2 || n === 3) return true;
        else if (n > 4) {
            const m = n % 6;
            if (m !== 1 && m !== 5) return false;

            const nSqrt = Math.floor(Math.sqrt(n));

            for (let i = 5; i <= nSqrt; i += 6) {
                if (n % i === 0 || n % (i + 2) === 0) return false;
                // n % i: 6n + 5 -> 6(n + 1) - 1 -> 6n - 1, n % (i + 2): 6n + 1
            }
            return true;
        }
    }
};
var countPrimes = function (n) {
    const seen = new Uint8Array(n);
    let count = 0;
    for (let num = 2; num < n; num++) {
        if (seen[num]) continue;
        count++;

        for (let mult = num * num; mult < n; mult += num)
            seen[mult] = 1;
    }
    return count;
};
//#endregion

//#region 326. Power of Three
/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfThree = function (n) {
    const base = 3;
    while (n >= base) n = n / base;
    return n === 1;
};
//#endregion

//#region 13. Roman to Integer
/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function (s) {
    const mapper = { 'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000 };
    let result = 0, temp = 0;
    Array.from(s).forEach(char => {
        const num = mapper[char];
        if (temp < num) temp = num - temp;
        else {
            result += temp;
            temp = num;
        }
    });
    result += temp;
    return result;
};
//#endregion

/********** Others **********/
//#region 191. Number of 1 Bits
/**
 * @param {number} n - a positive integer
 * @return {number}
 */
var hammingWeight = function (n) {
    return Array.from(n.toString(2)).reduce((count, num) => {
        if (num === '1') count++;
        return count;
    }, 0)
};
var hammingWeight = function (n) {
    let count = 0;
    while (n !== 0) {
        if (n & 1 === 1) count++;
        n = n >> 1;
    }
    return count;
};
//#endregion

//#region 461. Hamming Distance
/**
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
var hammingDistance = function (x, y) {
    return Array.from((x ^ y).toString(2)).reduce((count, num) => {
        if (num === '1') count++;
        return count;
    }, 0)
};
//#endregion

//#region 190. Reverse Bits
/**
 * @param {number} n - a positive integer
 * @return {number} - a positive integer
 */
var reverseBits = function (n) {
    const temp = Array.from(n.toString(2));
    const len = 32 - temp.length;
    const arr = new Array(len).fill(0).concat(temp);
    return parseInt(arr.reverse().join(''), 2);
};
var reverseBits = function(n) {
    let result = 0;
    for (let i = 0; i < 32; i ++) {
        result *= 2;
        result += n & 1;        
        n >>= 1;
    }
    return result;
};
//#endregion

//#region 118. Pascal's Triangle
/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function (numRows) {
    const rows = [[1]];
    while (rows.length < numRows) {
        const currRow = rows[rows.length - 1], nextRow = [];
        let temp = 0;
        for (let i = 0; i < currRow.length; i++) {
            nextRow.push(temp + currRow[i]);
            temp = currRow[i];
        }
        nextRow.push(temp);
        rows.push(nextRow);
    }
    return rows;
};
//#endregion

//#region 20. Valid Parentheses
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
    const mapper = { '}': '{', ']': '[', ')': '(' };
    const stack_p = [];
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        if (char === '{' || char === '[' || char === '(') stack_p.push(char);
        else if (mapper[char]) {
            if (stack_p.pop() !== mapper[char]) return false;
        }
    }
    return stack_p.length === 0;
};
//#endregion

//#region 268. Missing Number
/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function (nums) {
    return nums.reduce((miss_n, num, i) => miss_n + i - num, nums.length)
};
//#endregion