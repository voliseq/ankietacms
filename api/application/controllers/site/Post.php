<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Post extends CI_Controller {

public function __construct()
{
		parent::__construct();
		$post = file_get_contents( 'php://input' );
		$_POST = json_decode( $post , true );	
		$this->load->model( 'site/Post_model' );
}


public function create()
{

		$token = $this->input->post('token');
		$token = $this->jwt->decode($token, config_item('encryption_key'));
		$token = json_decode(json_encode($token), true);

		$questionaire = $this->input->post('questionaire');
		$questionaire['posttime'] = time();
		$this->Post_model->create($questionaire);
		// $imgType = explode('/', $imgType); // seperating file type from file extension !
		
		// //VALIDATE ANSWERS
		// $answers = json_decode($answers, true);
		// foreach($answers as $answer)
		// 	{
		// 		if((strlen($answer['text']) > 150) || (strlen($answer['text']) == 0))
		// 		{
		// 			$errors['answers'] = "Któras odpowiedz jest pusta bądź dluższa niż 100 znaków";
		// 			$ansValidate = false;
		// 		} 
		// 		else
		// 			$ansValidate = true;
		// 	}
		// //VALIDATE QUESTION
		// if(strlen($question) != 0 && strlen($question) <= 150 && strlen($question) >= 1)
		// 	$questionValidate = true;
		// else
		// 	$errors['question'] = "Question should have between 1 - 150 characters";
		// //VALIDATE IMG
		// if($img && $imgType[0] == "image" && $imgSize < 2500000)
		// 	$imgValidate = true;
		// else
		// 	$errors['img'] = "Zalaczony plik musi byc obrazkiem i wazyc nie wiecej niz 2mb!";
		// //CHECK IF ALL DATA IS VALID//
		// if($ansValidate && $imgValidate && $questionValidate)
		// {
		// 	$imgExtension = $imgType[1];
		// 	$this->Post_model->create($entry, $img, $imgExtension);
		// } // CREATE POST
		// else
		// 	echo json_encode($errors);

// else{
// 	$errors['time'] = "Jeden post na 20 sec";
// 	echo json_encode($errors);
// }
	
}
public function createComment(){
	$text = $this->input->post('text');
	$token = $this->input->post('token');
	$postId = $this->input->post('postId');
	if($token){
		$token = $this->jwt->decode($token, config_item('encryption_key'));
		$token = json_decode(json_encode($token), true);
		$user = $token['name'];
		$this->db->where('name', $user);
		$result = $this->db->get('zapytuj_users')->result();
		$commentTime = $result[0]->comment_time;
		if($result[0]->comment_time == NULL || intval(time() - $result[0]->comment_time) > 10)
			$this->Post_model->createComment($text, $user, $postId);
		else{
			$errors = "Możesz dodac 1 komentarz na 10 sekund";
			echo $errors;
		}
	}
	else{
		$errors = "Musisz byc zalogowany zeby dodac komentarz";
		echo $errors;
	}
	
}
public function vote()
{
		$idQ = $this->input->post('idQ');
		$votes = $this->input>post('votes');
		$token = $this->input->post('token');
		$token = $this->jwt->decode($token, config_item('encryption_key'));
		$token = json_decode(json_encode($token), true);
		$userId = $token['userId'];

		$output = $this->Post_model->update($idQ, $userId);


		echo json_encode($output);	
}
public function fakeUpdate()
{
		$votes = $this->input->post('votes');
		$output = $this->Post_model->fakeVote($votes);
		echo json_encode($output);

}
public function getActive()
{
	$output = $this->Post_model->getActive();
}
public function activate($idQ){
	$output = $this->Post_model->activate($idQ);
}
public function getAll()
{
	$output = $this->Post_model->getAll();
}
public function getOne($qId)
{
	$output = $this->Post_model->getOne($qId);
}
public function getUserPosts(){ // fetches USER's posts
		$userId = $this->input->post('userId');
		$id = $this->input->post('id');
		$output = $this->Post_model->getUserPosts($userId, $id);
}


public function getAmount($userId = false)
	{
		if(!$userId)
		    echo $this->db->count_all('zapytuj_posts');
		else{
			$this->db->like('userId', $userId);
			$this->db->from('zapytuj_posts');
			echo $this->db->count_all_results();
		}
	}
public function getVotes($idQ)
	{
		$output = $this->Post_model->getVotes($idQ);
	}
}

/* End of file Post.php */
/* Location: ./application/controllers/Post.php */