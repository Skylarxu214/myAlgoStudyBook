function twoSum(nums, target) {
    // setup an object {ele:index.....}
    // use a loop if the target - nums[index] is exisit in the box, return [box[target - nums[i]],i]
    let box = {}
    for( let i = 0; i < nums.length; i++){
        if(target - nums[i] in box){
            return [box[target - nums[i]], i]
        }else{
            box[nums[i]] = i
        }}
    return []
}

function removeDuplicates(nums) {
    // set a new index 
    // loop through the array, as long the current item is not eaqual to the previous one, the index will ++, finally return the index 
    
    let index = 1
    for(let i = 1;i < nums.length; i++){
        if(nums[i] !== nums[i-1]){
            nums[index] = nums[i]
            index ++
        }
    }
    return index
};

function rotateArray(nums, k){
    k %= nums.length

    let reverse = function(i,j){
        while(i < j){
            let temp = nums[i]
            nums[i] = nums[j]
            nums[j] = temp
            i++
            j--
        }
    }

    reverse(0, nums.length-1)
    reverse(0,k-1)
    reverse(k, nums.length-1)
    return nums
}

var containsDuplicate = function(nums) {
    // hash map 
    // if nums[i] in hash, return true, else hash[nums[i]] = i, i++
    //return false
    
    let hash= {}
    for(let i = 0; i < nums.length; i++){
        if(hash[nums[i]]){
            return true
        }else{
            hash[nums[i]] = true
        }
    }
    return false
};

function longestSubstringWithKDistinct(str,k){
    let hash = {}
    let start = 0
    let result = 0

    for (let end = 0; end < str.length; end ++){
        let rightChar = str[end]
        if(!(rightChar in hash)){
            hash[rightChar] = 0
        }
        hash[rightChar] += 1

        while(Object.keys(hash).length > k){
            let leftChar = str[start]
            hash[leftChar] -= 1
            if (hash[leftChar]===0){
                delete hash[leftChar]
            }
            start ++
        }
        result = Math.max(result, end - start + 1)
    }
    return result
}


function maxSubArrayOfSizeK(arr, k){
    let start = 0
    let result = []
    let sum =0

    for (let end = 0; end < arr.length; end ++){
        sum += arr[end]
       if (end >= k - 1){
            result.push(sum)
            sum -= arr[start]
            start ++
        }
    }
    return Math.max(...result)
}

function smallestSubarrayWithAGreaterSum(arr, s){
    let start = 0
    let sum = 0
    let result = Infinity

    for (let end = 0; end < arr.length; end ++){
        sum += arr[end]
        while(sum >= s){
            result = Math.min(result, end-start+1)
            sum -= arr[start]
            start ++
        }
    }

    if(result === Infinity){
        return 0
    }
    return result
}

function bestTimeToBuyStock(prices){
    // set two variables: result = 0, min = prices[0]
    // in a for loop, i = 1, compare use Math.min to find the smallest number 
    // also get the biggest result number by using Math.max(prices[i] - min, result)
    let result = 0
    let min = prices[0]
    for(let i = 1; i < prices.length; i++){
        min = Math.min(min, prices[i])
        result = Math.max(result, prices[i] - min)
    }
    return result
}


function bestTimeToBuyII(prices){
    let result = 0
    for (let i = 1; i < prices.length; i++){
        if(prices[i] > prices[i -1]){
            result += prices[i] - prices[i -1]
        }
    }
    return result
}

function productArrayExceptSelt(nums){
    let result = []
    let left = 1
    let right = 1
    for(let i = 0; i < nums.length; i++){
        result[i] = left
        left *= nums[i]
    }
    for(let i = nums.length - 1; i >= 0; i --){
        result[i] *= right
        right *= nums[i]
    }

    return result 
}



function maxSubarray(nums){
    // compare the current window with the next element 
    // if the element is greater than the current window + next element 
    // start new window

    let sum = 0
    let result = -Infinity
    for (let i = 0; i < nums.length; i ++){
        sum = Math.max(nums[i], nums[i] + sum)
        result = Math.max(sum, result)
    }
    return result
}

var climbStairs = function(n) {
    let a = 1
    let b = 2
    for ( let i = 3; i <= n; i ++   ){
        let next = a+b
        a = b
        b = next
    }
    return n===1?a : b 
    

};

function climbStairs2(n){
    let memo = {}
    if (n === 1){
        return 1
    }
    if (n === 2){
        return 2
    }

    return memo[n] = climbStairs2(n-1) + climbStairs2(n-2)
}

function rob(nums){
    // leetcode 198
    // setup the first 2 element to decide where to start robbing, compare 
    // the 1+ 3 and 2, keep the greater one and keep moving on, 
    // the new two before will be  prev onebefore
    // and the new onebefore will be max at current
    // finally return the max at current
    // in the beginning, the comapre is between 2 sets, for example 0+2 & 1+3, after get the largets, we just keep trying to get the greatest sum 
    // use bottom up, memoization 
    // time O(n), space O(1)
    if(!nums.length) {
        return 0
    }
    if(nums.length === 1) return nums[0]
    if(nums.length === 2) return Math.max(nums[0], nums[1])
    let twoBefore =nums[0]
    let oneBefore = Math.max(nums[0], nums[1])
    for(let i = 2; i < nums.length; i++){
        let currentAtMax = Math.max(oneBefore, twoBefore + nums[i])
        twoBefore = oneBefore
        oneBefore = currentAtMax
    }

    return oneBefore
}

function maxProduct(nums){
    let min = nums[0]
    let max = nums[0]
    let result = nums[0]

    for(let i =1 ; i < nums.length; i++){
        let curMin = Math.min(nums[i], nums[i]*min, nums[i]*max)
        let curMax = Math.max(nums[i], nums[i]*min, nums[i]*max)
        min = curMin 
        max = curMax
        result = Math.max(max. result)
    }
    return result
}

function cheapestFlights(n,flights, src,dst, k){
    // whole picture: bellman ford algorithm. array to store all the prices infinity, but set src 0 since the trip starts there, keep fly to different dst, which can 
    // renew the store the price, in a loop if the src reach to the dst, count the price and keep upload the least number
    // the loop should be k+1 long, since the the src is included: like if k is 1, from a-b-c is 1 stop but have to fly twice this
    // is where k+1 from
    //eventually if the flights never reach to the given dst in K+1 times, it should be still infinity, return -1 
    // time complexity: O(E*K) e => number of edges 
    // space complexity: O(2n) prices arr and its temp

    let prices = Array(n).fill(Infinity)
    prices[src] = 0
    for(let i =0; i< k+1; i++){
        let temp = [...prices]
        for(let[s,d,p] of flights){
            if(prices[s] === Infinity ) continue;
            if(prices[s] + p < temp[d]){
                temp[d] = prices[s] + p
            }
        }
        prices = [...temp]
        console.log(prices)
    }
    return prices[dst]===Infinity? -1 : prices[dst]
}

var twoNumbers = function(l1,l2){
    let addOne = 0
    let sum = new ListNode(0)
    let head = sum 
    while(addOne || l1 || l2){
        let val1 = l1 !== null? l1.val : 0
        let val2 = l2 !== null? l2.val : 0
        let r = val1 + val2 + addOne 
        addOne = r >= 10? 1 : 0
        sum.next = new ListNode(r % 10)
        sum = sum.next
        if(l1) l1 = l1.next
        if(l2) l2 = l2.next
    }
    return head.next
}

function non_repeat(str){
    let left = 0, map = {}, max = 0;
    for(let right = 0; right < str.length; right++){
        let r = str[right];
        map[r] = (map[r] || 0) + 1;
        while(map[r] > 1){
            let l = str[left];
            map[l] --
            left ++
        }

        max = Math.max(max, right - left + 1)
    }

    return max
}

// console.log(non_repeat('aaabcdcbb'))

function fruit_basket(arr){
    let left = 0, map = {}, max = 0;
    for(let right = 0; right < arr.length; right ++){
        let r = arr[right];
        map[r] = (map[r] || 0) +1;
        while(Object.keys(map).length > 2){
            let l = arr[left]
            map[l] --
            if(map[l] === 0){
                delete map[l]
            }
            left ++
        }
        max = Math.max(max, right - left + 1)
    }

    return max;
}

// console.log(fruit_basket(['A', 'B', 'C', 'B', 'B', 'C']))

function withOnesAfterReplacement(arr, k){
    let left = 0, max = 0, count = 0
    for(let right = 0; right < arr.length; right ++){
        let r = arr[right];
        if(r === 1){
            count ++
        }

        if(right - left + 1 - count > k){
            let l = arr[left];
            if(l === 1){
                count --; 
            }
            left ++;
        }
            max = Math.max(max, right - left + 1)
    }
    return max
}

// console.log(withOnesAfterReplacement([0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1], 2))

function find_string_anagrams(str, pattern) {
    let windowStart = 0,
        matched = 0,
        charFrequency = {};

    for (i = 0; i < pattern.length; i++) {
        const chr = pattern[i];
        if (!(chr in charFrequency)) {
            charFrequency[chr] = 0;
        }
        charFrequency[chr] += 1;
    }

    const resultIndices = [];
    // our goal is to match all the characters from the 'charFrequency' with the current 
    // window try to extend the range [windowStart, windowEnd]
    for (windowEnd = 0; windowEnd < str.length; windowEnd++) {
        const rightChar = str[windowEnd];
        if (rightChar in charFrequency) {
            // decrement the frequency of matched character
            charFrequency[rightChar] -= 1;
            if (charFrequency[rightChar] === 0) {
                matched += 1;
            }
        }
        console.log(charFrequency)

        if (matched === Object.keys(charFrequency).length) { // have we found an anagram?
            resultIndices.push(windowStart);
        }

        // shrink the sliding window
        if (windowEnd >= pattern.length - 1) {
            leftChar = str[windowStart];
            windowStart += 1;
            if (leftChar in charFrequency) {
                if (charFrequency[leftChar] === 0) {
                    matched -= 1; // before putting the character back, decrement the matched count
                }
                charFrequency[leftChar] += 1; // put the character back
            }
        }
    }

    return resultIndices;
}


// console.log(find_string_anagrams('ppqqappq', 'pq'));
// console.log(find_string_anagrams('abbcabc', 'abc'));


function find_substring(str, pattern){
    let left = 0, count = 0, subStrStart = 0, minLen = str.length +1, map = {};
    for (let i = 0; i < pattern.length; i ++){
        let k = pattern[i]
        map[k] = (map[k] || 0) + 1
    }

    for(let right = 0; right < str.length; right ++){
        let r = str[right]
        if( r in map){
            map[r] --;
            // this step is a bit different than the frequent substring
            // this one count the numbers of the pattern
            // so other ele can be involved
            // and only if the ele is occurate the count will add
            // if an extra a map[r] < 0, count wont do anything
            if(map[r] >= 0){
                count ++
            }
           
        }
        console.log( map)
        console.log('count:' + count)
        // instead of count === Object.keys(map).length, we use pattern.length 
        while( count  === pattern.length){
            if(minLen > right - left + 1){
                minLen = right - left + 1;
                subStrStart = left
            }

            const l = str[left];
            left ++
            if(l in map){
                // gotta check the current map[l]
                // map[l] ++
                // map[l] will only be === 0 or < 0
                // since count is perfectly matched the t.length
                if(map[l] === 0){
                    count --
                }
                map[l] ++ 
            }
        }
    }

    if (minLen > str.length){
        return '';
    }

    return str.substring(subStrStart, subStrStart + minLen)
}


console.log(find_substring('bbdcecad', 'abc'));

function non_repeat_substring(str) {
    let windowStart = 0,
        maxLength = 0,
        charIndexMap = {};

    // try to extend the range [windowStart, windowEnd]
    for (let windowEnd = 0; windowEnd < str.length; windowEnd++) {
        const rightChar = str[windowEnd];
        // if the map already contains the 'rightChar', shrink the window from the beginning 
        // so that we have only one occurrence of 'rightChar'
        if (rightChar in charIndexMap) {
            // this is tricky; in the current window, we will not have any 'rightChar' after 
            // its previous index and if 'windowStart' is already ahead of the last index of 
            // 'rightChar', we'll keep 'windowStart'
            windowStart = charIndexMap[rightChar] + 1;
        }
        // insert the 'rightChar' into the map
        charIndexMap[rightChar] = windowEnd;
        // remember the maximum length so far
        maxLength = Math.max(maxLength, windowEnd - windowStart + 1);
    }
    return maxLength;
}


console.log(`Length of the longest substring: ${non_repeat_substring('abbccde')}`);
