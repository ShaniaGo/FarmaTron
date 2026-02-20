<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('usuarios', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('cedula')->unique();
            $table->string('nombre_completo', 100);
            $table->string('email', 100)->unique();
            $table->string('clave');
            $table->string('telefono', 20);
            $table->text('direccion')->nullable();
            $table->enum('tipo', ['cliente', 'farmaceutico', 'repartidor', 'admin'])->default('cliente');
            $table->date('fecha_nacimiento')->nullable();
            $table->enum('genero', ['M', 'F', 'Otro'])->nullable();
            $table->string('foto_perfil')->nullable();
            $table->string('licencia_conducir', 50)->nullable();
            $table->enum('vehiculo_tipo', ['moto', 'auto', 'bicicleta'])->nullable();
            $table->string('placa_vehiculo', 20)->nullable();
            $table->enum('estado', ['activo', 'inactivo', 'suspendido', 'ocupado'])->default('activo');
            $table->timestamp('fecha_registro')->useCurrent();
            $table->timestamp('ultimo_login')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('usuarios');
    }
};
