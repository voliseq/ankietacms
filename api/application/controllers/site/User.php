<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class User extends CI_Controller {

	public function __construct()
	{
		parent::__construct();

		$post = file_get_contents( 'php://input' );
		$_POST = json_decode( $post , true );

		$this->load->model( 'site/User_model' );	

	}
function random_string($length = 12) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}



	public function get( $id )
	{
		$output = $this->User_model->get( $id );
		echo json_encode( $output );
	}

	public function create()
	{
		$this->form_validation->set_error_delimiters( '' , '' );
		$this->form_validation->set_rules( 'name' , 'Imię' , 'required|min_length[3]|is_unique[users.name]' );
		$this->form_validation->set_rules( 'email' , 'Email' , 'required|valid_email|is_unique[users.email]' );
		$this->form_validation->set_rules( 'password' , 'Hasło' , 'required|matches[passconf]' );
		$this->form_validation->set_rules( 'passconf' , 'Powtórz hasło' , 'required|matches[password]' );
		if ( $this->form_validation->run() )
		{
			$activationCode = $this->random_string();
			$user = $this->input->post( 'user' );
			$user['role'] = 'user';
			$user['activation_code'] = $activationCode;
			unset( $user['passconf'] );
			$user['password'] = crypt( $user['password'] , config_item( 'encryption_key' ) );
			$this->User_model->create( $user );
		}
		else
		{
			$errors['name'] = form_error( 'name' );
			$errors['email'] = form_error( 'email' );
			$errors['password'] = form_error( 'password' );
			$errors['passconf'] = form_error( 'passconf' );
			echo json_encode( $errors );
		}

	}
	public function activate(){
		$userId = $this->input->post('user_id');
		$activationCode = $this->input->post('activation_code');
		$this->db->where('id', $userId);
		$this->db->where('activation_code', $activationCode);
		$this->db->set('active', 1);
		$this->db->update('zapytuj_users');

	}
	public function login()
	{
		$email = $this->input->post( 'email' );
		$password = $this->input->post( 'password' );
		$password = crypt( $password , config_item( 'encryption_key' ) );

		$login = $this->User_model->login( $email , $password);

		if ( !$login )
		{
			$output['error'] = 'Błędne hasło lub login (lub nieaktywne konto)';
		}
		else if(!$login->active){
			$output['error'] = "Aktywuj swoje konto !";
		}
		else
		{
			$token = $this->jwt->encode( array(
				'userId' => $login->id,
				'name' => $login->name,
				'email' => $login->email,
				'role' => $login->role
				) , config_item( 'encryption_key' ) );
			$output['token'] = $token;
			$output['time'] = time();
		}
		
		echo json_encode( $output );

	}



}

/* End of file Users.php */
/* Location: ./application/controllers/Users.php */