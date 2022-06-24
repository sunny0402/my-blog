# Junior PHP Developer Interview: TODO List

_April 20, 2022 by [SunnyCodes](/)_

```
console.log("Hello World! My first coding blog article.");
```

I have been interviewing for junior developer jobs. Looking for my first job as a developer. Because of a past Laravel project in my portfolio, PHP roles seem like my best bet. This is 2022, so no PHP is not dead and neither is the to do list. And JavaScripters don't forget about object oriented programming.

The task is to create several classes which implement a to do list app. I was asked to complete this within an hour and get as much done as possible. I am sure you know the result, but in this article we'll go through a full solution.

Functionality:

- add todo
- delete
- modify
- swap order of todos - print the entire list.

## Our Classes: List, Todo Item, Category

To get started let's initialize a class for the list, a class for the todo item and a separate category class. Create the following files in your project folder: index.php, MyList.php, Todo.php, and Category.php. Add the following code to the respective files.

MyList.php

```
<?php

class MyList
{
    private array $todo_list = [];
    private string $list_title;

    public function __construct(string $list_title)
    {
        $this->list_title = $list_title;
    }

    public function addTodo(Todo $todo_item): void
    {
        $this->todo_list[] = $todo_item;
    }

    public function getListTitle(): string
    {
        return $this->list_title;
    }

    public function getList(): array
    {
        return $this->todo_list;
    }
}

```

Todo.php

```
class Todo
{
    private string $name;

    public function __construct(string $a_name)
    {
        $this->name = $a_name;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $new_name): void
    {
        $this->name = $new_name;
    }
}
```

Category.php

```
class Category
{
    private string $category_name;

    public function __construct(string $category)
    {
        $this->category_name = $category;
    }

    public function getCategory(): string
    {
        return $this->category_name;
    }
}

```

index.php

```
<?php

require_once "./MyList.php";
require_once "./Todo.php";
require_once "./Category.php";

/*
* Getting Started:
- create 1 todo list
- create 3 items ("item 1", "item 2", "item 3")
- create 2 categories ("cat 1", "cat 2")
- associate all the items with the todo list (sorted by order of adding)
**/

$my_list = new MyList("My First TODO List");

$todo_1 = new Todo("item 1");
$todo_2 = new Todo("item 2");
$todo_3 = new Todo("item 3");

$category_1 = new Category("cat 1");
$category_2 = new Category("cat 2");

$my_list->addTodo($todo_1);
$my_list->addTodo($todo_2);
$my_list->addTodo($todo_3);

print_r($my_list);
```

Let's test our code by making sure we can do all of the following.

- create 1 todo list
- create 3 items ("item 1", "item 2", "item 3")
- create 2 categories ("cat 1", "cat 2")
- associate all the items with the todo list (sorted by order of adding)

In the terminal run:

```
php index.php
```

At this point the output should something like below. Simply a MyList object with an array containing all the todo items and a list_title property.

```
MyList Object
(
    [todo_list:MyList:private] => Array
        (
            [0] => Todo Object
                (
                    [name:Todo:private] => item 1
                )

            [1] => Todo Object
                (
                    [name:Todo:private] => item 2
                )

            [2] => Todo Object
                (
                    [name:Todo:private] => item 3
                )

        )

    [list_title:MyList:private] => My First TODO List
)

```

### Second List of Tasks

Our next set of tasks includes the following:

- associate "item 1" and "item 2" with "cat 1"
- associate "item 3" with the "cat 2"
- change "item 1" to "item 1 - modified"
- swap the order of "item 2" and "item 3"

Remember that the category of a todo item is a seperate class. The categories were previously declared as :

index.php

```
$category_1 = new Category("cat 1");
$category_2 = new Category("cat 2");

```

To be able to pass category to an item we add a class property to keep track of the category.

Todo.php

```
 private Category $task_category;

```

Additionally, we add thw following methods to our Todo class.

Todo.php

```
    public function addCategory(Category $another_category)
    {
        $this->task_category = $another_category;
    }

    public function getCategory(): Category
    {
        return $this->task_category;
    }
```

Notice that the getCategory method returns a category object. So let's edit the category class to return string of the cateogry.

Category.php should look as below now.

Category.php

```
<?php

class Category
{
    private string $category_name;

    public function __construct(string $category)
    {
        $this->category_name = $category;
    }
    public function getCategoryName(): string
    {
        return $this->category_name;
    }

    public function setCategoryName(string $new_name): void
    {
        $this->category_name = $new_name;
    }
}

```

Swapping todo items in our todo list will require the following addtions to our MyList class. For simplicity I assume we know the index of the item we want to swap.

MyList.php

```
    public function getTodo(int $todo_idx): Todo
    {
        return $this->todo_list[$todo_idx];
    }

    public function swapListItems(int $idx_item1, int $idx_item2): void
    {
        $temp = $this->getTodo($idx_item1);
        $this->todo_list[$idx_item1] = $this->getTodo($idx_item2);
        $this->todo_list[$idx_item2] = $temp;
    }
```

If you want to view all the edits required to get to this point visit the [repository](https://github.com/sunny0402/blog_content_todo_list_php/commit/5f4b3794dd49e71a08bda651017afe0dcc245e1e).

These are the additions to index.php.

index.php

```
$todo_1->addCategory($category_1);
$todo_2->addCategory($category_1);
$todo_3->addCategory($category_2);

echo $todo_1->getCategory()->getCategoryName() . PHP_EOL;
echo $todo_3->getCategory()->getCategoryName() . PHP_EOL;

$todo_1->setName("item 1 - modified");

$my_list->swapListItems(1, 2);
print_r($my_list);
```

### Extra

The next set of tasks were highlighted as extra in the interview.

- adding item category
- removing item category
- remove all items from category
- an item should contain the task and creation time
- print todo list, with categories and item orders in the appropriate order.

For a todo item to have multiple categories I will change the the Todo class property to an array of categories.

Todo.php

```
 private array $task_category_array = [];
```

Let's also edit the getCategory() method to getAllCategories(), which will return an array of categories belonging to that todo item. Since we now have an array of categories let's also edit the addCategory() method to avoid duplicate categories.

Todo.php

```
    public function addCategory(Category $another_category)
    {
        foreach ($this->getAllCategories() as $a_category_object) {
            if ($a_category_object->getCategoryName() === $another_category->getCategoryName()) {
                echo "The category " . $another_category->getCategoryName() . " already exists.";
                return;
            }
        }
        $this->task_category_array[] = $another_category;
    }

    public function getAllCategories(): array
    {
        return $this->task_category_array;
    }
```

```
console.log("Thank you for reading. If this article was helpful following me on Twitter or share this article with someone else.");
```
